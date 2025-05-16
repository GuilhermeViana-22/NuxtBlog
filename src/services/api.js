import axios from 'axios'
import router from '@/router'
import { HTTP_CODES, HTTP_MESSAGES } from '@/components/constants/httpCodes.js'

// Configuração base da API
const api = axios.create({
  baseURL: 'http://127.0.0.1:8001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

/**
 * Interceptor de requisição
 */
api.interceptors.request.use(config => {
  const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  config.metadata = { requestId }
  
  console.groupCollapsed(`[API] Request ${requestId}: ${config.method.toUpperCase()} ${config.url}`)
  console.log('Base URL:', config.baseURL)
  console.log('Full URL:', `${config.baseURL}${config.url}`)
  console.log('Headers:', config.headers)
  
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('Authorization token added')
  }
  
  if (config.data) {
    console.log('Request Data:', config.data)
  }
  
  console.groupEnd()
  return config
}, error => {
  console.error('[API] Request Interceptor Error:', error)
  return Promise.reject(error)
})

/**
 * Interceptor de resposta
 */
api.interceptors.response.use(response => {
  const { config, status, data } = response
  const { requestId } = config.metadata
  
  console.groupCollapsed(`[API] Response ${requestId}: ${status} ${config.method.toUpperCase()} ${config.url}`)
  console.log('Status:', status)
  console.log('Data:', data)
  console.log('Headers:', response.headers)
  console.groupEnd()
  
  return response
}, error => {
  if (!error.response) {
    console.error('[API] Network/Request Error:', error.message)
    return Promise.reject({
      code: 'NETWORK_ERROR',
      message: 'Erro de conexão. Verifique sua internet.',
      original: error
    })
  }

  const { config, status, data } = error.response
  const { requestId } = config.metadata
  
  console.groupCollapsed(`[API] Error ${requestId}: ${status} ${config.method.toUpperCase()} ${config.url}`)
  console.error('Status:', status)
  console.error('Error Data:', data)
  console.error('Request Data:', config.data)
  console.groupEnd()

  // Tratamento específico para erros conhecidos
  const enhancedError = {
    code: data?.code || `HTTP_${status}`,
    message: data?.message || HTTP_MESSAGES[status] || 'Erro desconhecido',
    status,
    data: data?.data || null,
    validationErrors: data?.errors || null,
    original: error
  }

  switch (status) {
    case HTTP_CODES.UNAUTHORIZED:
      handleUnauthorized(enhancedError)
      break
    case HTTP_CODES.FORBIDDEN:
      handleForbidden(enhancedError)
      break
    case HTTP_CODES.NOT_FOUND:
      handleNotFound(enhancedError)
      break
    case HTTP_CODES.VALIDATION_ERROR:
      enhancedError.code = 'VALIDATION_ERROR'
      break
    case HTTP_CODES.INTERNAL_SERVER_ERROR:
      handleServerError(enhancedError)
      break
  }

  return Promise.reject(enhancedError)
})

/**
 * Tratamento de erro 401 - Não autorizado
 */
function handleUnauthorized(error) {
  console.warn('[API] Handling 401 Unauthorized', error)
  
  // Limpa tokens e dados de sessão
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  
  // Redireciona para login se não estiver já na página de login
  if (router.currentRoute.value.name !== 'login') {
    router.push({
      name: 'login',
      query: { redirect: router.currentRoute.value.fullPath }
    })
  }
}

/**
 * Tratamento de erro 403 - Proibido
 */
function handleForbidden(error) {
  console.warn('[API] Handling 403 Forbidden', error)
  // Pode adicionar redirecionamento para página de acesso negado se necessário
}

/**
 * Tratamento de erro 404 - Não encontrado
 */
function handleNotFound(error) {
  console.warn('[API] Handling 404 Not Found', error)
  // Pode adicionar redirecionamento para página 404 se necessário
}

/**
 * Tratamento de erro 500 - Erro interno do servidor
 */
function handleServerError(error) {
  console.error('[API] Handling 500 Server Error', error)
  // Pode adicionar notificação global de erro no servidor
}

/**
 * Métodos específicos para posts
 */
const postService = {
  async getPost(id) {
    try {
      const response = await api.get(`/posts/${id}`)
      return response.data
    } catch (error) {
      if (error.status === HTTP_CODES.NOT_FOUND) {
        throw { ...error, message: 'Post não encontrado' }
      }
      throw error
    }
  },
  
  async likePost(id) {
    return api.post(`/posts/${id}/like`)
  },
  
  async unlikePost(id) {
    return api.delete(`/posts/${id}/like`)
  },
  
  async bookmarkPost(id) {
    return api.post(`/posts/${id}/bookmark`)
  },
  
  async unbookmarkPost(id) {
    return api.delete(`/posts/${id}/bookmark`)
  },
  
  async getComments(postId) {
    return api.get(`/posts/${postId}/comments`)
  },
  
  async addComment(postId, content) {
    return api.post(`/posts/${postId}/comments`, { content })
  }
}

export { api as default, postService }