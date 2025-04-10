<template>
  <div class="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
        Crie sua conta
      </h2>
      <p class="mt-2 text-center text-sm text-gray-300">
        Já tem uma conta?
        <a href="/login" class="font-medium text-green-400 hover:text-green-300 transition-colors">
          Faça login
        </a>
      </p>
    </div>

    <!-- Form Container -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-800 py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-700">
        <!-- Form -->
        <form class="mb-0 space-y-6" @submit.prevent="handleSubmit">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300">
              Nome completo
            </label>
            <div class="mt-1">
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                v-model="form.name"
                class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Seu nome completo"
              >
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div class="mt-1">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="form.email"
                class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="seu@email.com"
              >
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <div class="mt-1">
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="new-password" 
                required 
                v-model="form.password"
                class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="••••••••"
              >
            </div>
          </div>

          <!-- Password Confirmation Field -->
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-300">
              Confirme sua senha
            </label>
            <div class="mt-1">
              <input 
                id="password_confirmation" 
                name="password_confirmation" 
                type="password" 
                autocomplete="new-password" 
                required 
                v-model="form.password_confirmation"
                class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="••••••••"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Cadastrar</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-800 text-gray-400">
                Ou continue com
              </span>
            </div>
          </div>
        </div>

        <!-- Social Login -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <div>
            <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>

          <div>
            <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer Links -->
    <div class="mt-8 text-center text-sm text-gray-400">
      <router-link to="/terms" class="hover:text-gray-300 transition-colors">Termos de serviço</router-link>
      <span class="mx-2">•</span>
      <router-link to="/" class="text-green-400 hover:text-green-300 font-medium transition-colors">
        Voltar para a tela principal
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
import { showError, showSuccess } from '@/utils/swalConfig'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      isSubmitting: false
    }
  },
  methods: {
    async handleSubmit() {
      // Validação básica
      if (this.form.password !== this.form.password_confirmation) {
        await showError('As senhas não coincidem!', 'Validação')
        return
      }

      this.isSubmitting = true

      try {
        const response = await api.post('register', this.form)
        
        await showSuccess(`
          <p>Registro realizado com sucesso!</p>
          <p class="text-sm mt-2">Verifique seu e-mail para ativar sua conta.</p>
        `)
        
        this.$router.push('/verify-code')
        
      } catch (error) {
        let errorMessage = 'Ocorreu um erro no registro'
        
        if (error.response) {
          if (error.response.status === 422 && error.response.data.errors) {
            // Formatando erros de validação
            const errors = Object.values(error.response.data.errors).flat()
            errorMessage = errors.join('<br>')
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message
          }
        } else if (error.request) {
          errorMessage = 'Não foi possível conectar ao servidor'
        }

        await showError(errorMessage)
        
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
/* Efeito de foco personalizado para inputs */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(72, 187, 120, 0.5);
}

/* Animação do spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>