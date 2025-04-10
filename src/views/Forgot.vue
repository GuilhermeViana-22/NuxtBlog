<template>
    <div class="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Recuperar senha
        </h2>
        <p class="mt-2 text-center text-sm text-gray-300">
          Digite seu e-mail para receber instruções de redefinição
        </p>
      </div>
  
      <!-- Form Container -->
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-gray-800 py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-700">
          <!-- Success Message (hidden by default) -->
          <div v-if="showSuccess" class="mb-4 p-4 bg-green-900 text-green-200 rounded-md border border-green-700">
            <div class="flex items-center">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>E-mail enviado com sucesso! Verifique sua caixa de entrada.</span>
            </div>
          </div>
  
          <!-- Form -->
          <form class="space-y-6" @submit.prevent="handleSubmit" v-if="!showSuccess">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300">
                Endereço de e-mail
              </label>
              <div class="mt-1">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autocomplete="email" 
                  required 
                  v-model="email"
                  class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="seu@email.com"
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
                <span v-if="!isSubmitting">Enviar instruções</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              </button>
            </div>
          </form>
  
          <!-- Back to Login Link -->
          <div class="mt-6 text-center">
            <router-link 
              to="/login" 
              class="text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
            >
              <svg class="inline h-4 w-4 mr-1 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Voltar para o login
            </router-link>
          </div>
        </div>
      </div>
  
      <!-- Footer Links -->
      <div class="mt-8 text-center text-sm text-gray-400">
        <a href="#" class="hover:text-gray-300 transition-colors">Termos de serviço</a>
        <span class="mx-2">•</span>
        <a href="#" class="hover:text-gray-300 transition-colors">Política de privacidade</a>
        <span class="mx-2">•</span>
        <a href="#" class="hover:text-gray-300 transition-colors">Contato</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        isSubmitting: false,
        showSuccess: false
      }
    },
    methods: {
      handleSubmit() {
        this.isSubmitting = true
        
        // Simula o envio do e-mail (substitua por chamada real à API)
        setTimeout(() => {
          console.log('E-mail de recuperação enviado para:', this.email)
          this.isSubmitting = false
          this.showSuccess = true
          
          // Em uma implementação real, você redirecionaria ou mostraria mensagem
        }, 1500)
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
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>