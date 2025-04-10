import axios from 'axios'
import router from '@/router'
import { HTTP_CODES, HTTP_MESSAGES } from '../components/constants/httpCodes'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  console.log('[API] Request Interceptor - Início')
  console.log(`[API] Request to: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`)
  
  const token = localStorage.getItem('token')
  if (token) {
    console.log('[API] Token encontrado, adicionando ao header')
    config.headers.Authorization = `Bearer ${token}`
  } else {
    console.log('[API] Nenhum token encontrado')
  }
  
  console.log('[API] Request Headers:', config.headers)
  if (config.data) {
    console.log('[API] Request Data:', config.data)
  }
  
  console.log('[API] Request Interceptor - Fim')
  return config
}, error => {
  console.error('[API] Request Interceptor Error:', error)
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  console.log('[API] Response Interceptor - Success')
  console.log(`[API] Response from: ${response.config.method.toUpperCase()} ${response.config.url}`)
  console.log('[API] Response Status:', response.status)
  console.log('[API] Response Data:', response.data)
  console.log('[API] Response Headers:', response.headers)
  
  return response
}, error => {
  console.log('[API] Response Interceptor - Error')
  
  if (error.response) {
    const { status, data, config } = error.response
    
    console.error(`[API] Error Response - Status: ${status}`)
    console.error('[API] Error Response - Data:', data)
    console.error(`[API] Error Request - URL: ${config.method.toUpperCase()} ${config.url}`)
    console.error('[API] Error Request - Data:', config.data)
    console.error('[API] Error Request - Headers:', config.headers)
    
    // Tratamento baseado nos códigos HTTP
    switch (status) {
      case HTTP_CODES.BAD_REQUEST: // 400
        console.error('[API] Bad Request Details:', {
          validationErrors: data.errors,
          message: data.message
        })
        break
      case HTTP_CODES.UNAUTHORIZED:
        handleUnauthorized()
        break
      case HTTP_CODES.FORBIDDEN:
        handleForbidden()
        break
      case HTTP_CODES.NOT_FOUND:
        handleNotFound()
        break
      case HTTP_CODES.INTERNAL_SERVER_ERROR:
        handleServerError()
        break
      default:
        handleDefaultError(status)
    }
  } else if (error.request) {
    console.error('[API] No Response Received:', error.request)
  } else {
    console.error('[API] Request Setup Error:', error.message)
  }
  
  return Promise.reject(error)
})

// Funções de tratamento específicas
function handleUnauthorized() {
  console.log('[API] Handling 401 Unauthorized')
  localStorage.removeItem('token')
  if (router.currentRoute.value.name !== 'login') {
    router.push({ name: 'login' })
  }
}

function handleForbidden() {
  console.error('[API] Handling 403 Forbidden:', HTTP_MESSAGES[403])
}

function handleNotFound() {
  console.error('[API] Handling 404 Not Found:', HTTP_MESSAGES[404])
}

function handleServerError() {
  console.error('[API] Handling 500 Server Error:', HTTP_MESSAGES[500])
}

function handleDefaultError(status) {
  console.error(`[API] Handling ${status} Error:`, HTTP_MESSAGES[status] || `Erro desconhecido: ${status}`)
}

export default api