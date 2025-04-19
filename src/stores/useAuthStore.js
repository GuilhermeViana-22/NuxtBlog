// stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  const setToken = (newToken) => {
    try {
      if (!newToken) throw new Error('Token não fornecido')
      token.value = newToken
      localStorage.setItem('token', newToken) // Chave consistente: 'token'
      error.value = null
    } catch (err) {
      error.value = err.message
      console.error('Erro ao definir token:', err)
    }
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
    error.value = null
  }

  const loadToken = () => {
    try {
      isLoading.value = true
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        token.value = storedToken
      }
    } catch (err) {
      error.value = 'Falha ao carregar token'
      console.error('Erro ao carregar token:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Inicializa o token ao criar a store
  loadToken()

  return {
    token,
    isLoading,
    error,
    isAuthenticated,
    setToken,
    logout,
    loadToken
  }
})