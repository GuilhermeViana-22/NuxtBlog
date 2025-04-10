<template>
    <div class="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
          <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        <div class="mt-6 text-center">
          <h2 class="text-3xl font-extrabold text-white">
            Verifique seu e-mail
          </h2>
          
          <div class="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
            <div class="flex items-center justify-center text-green-400 mb-4">
              <svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xl font-medium">Sucesso!</span>
            </div>
            
            <p class="text-gray-300 mb-6">
              Enviamos um código de 6 dígitos para <span class="font-medium text-white">{{ email }}</span>.
              Por favor, verifique sua caixa de entrada.
            </p>
  
            <!-- Input de código modificado para ter cor do background quando não focado -->
            <div class="mb-6">
              <label for="code" class="sr-only">Código de verificação</label>
              <div class="flex justify-center space-x-2">
                <input
  v-for="(digit, index) in digits"
  :key="index"
  v-model="digits[index]"
  @input="handleInput(index, $event)"
  @keydown.delete="handleBackspace(index, $event)"
  @focus="handleFocus(index)"
  @paste="handlePaste($event)"
  ref="inputs"
  type="text"
  maxlength="1"
  class="w-12 h-16 text-3xl text-center bg-gray-800 border-2 border-gray-800 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none text-white transition-all"
  :class="{
    'border-green-500 bg-gray-700': activeInput === index || digit,
    'bg-gray-800': !digit && activeInput !== index
  }"
/>

              </div>
              <p v-if="error" class="mt-2 text-sm text-red-400">{{ error }}</p>
            </div>
  
            <!-- Contador para reenvio -->
            <div class="bg-gray-700 p-4 rounded-md border border-gray-600 mb-4">
              <p class="text-gray-300 text-sm">
                Não recebeu o código? 
                <button 
                  @click="resendCode" 
                  class="text-green-400 hover:text-green-300 font-medium transition-colors"
                  :disabled="isResending || countdown > 0"
                >
                  <span v-if="countdown > 0">Reenviar em {{ countdown }}s</span>
                  <span v-else>Reenviar código</span>
                </button>
              </p>
            </div>
  
            <!-- Botão de verificação -->
            <button
              @click="verifyCode"
              class="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              :disabled="!isCodeComplete || isVerifying"
            >
              <span v-if="!isVerifying">Verificar Código</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </span>
            </button>
          </div>
          
          <div class="mt-6">
            <button @click="goToLogin" class="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              <svg class="inline h-4 w-4 mr-1 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Voltar para o login
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
    data() {
      return {
        email: 'gguicido.viana@gmail.com', // Substitua pelo email real
        digits: Array(6).fill(''),
        activeInput: 0,
        error: '',
        isVerifying: false,
        isResending: false,
        countdown: 30
      }
    },
    computed: {
      isCodeComplete() {
        return this.digits.every(digit => digit !== '')
      }
    },
    methods: {
      handleInput(index, event) {
        const value = event.target.value.toUpperCase() // Convertendo para maiúsculas para consistência
        
        // Permite apenas letras (A-Z) e números (0-9)
        if (!/^[A-Z0-9]$/i.test(value)) {
          this.digits[index] = ''
          return
        }
        
        this.digits[index] = value
        
        // Move para o próximo input
        if (value && index < this.digits.length - 1) {
          this.$refs.inputs[index + 1].focus()
        }
      },
      handleBackspace(index, event) {
        if (!this.digits[index] && index > 0) {
          this.$refs.inputs[index - 1].focus()
        }
      },
      handleFocus(index) {
        this.activeInput = index
        this.error = ''
      },
      handlePaste(event) {
        event.preventDefault()
        const pasteData = event.clipboardData.getData('text/plain').toUpperCase().slice(0, 6)
        
        if (/^[A-Z0-9]{1,6}$/i.test(pasteData)) {
          pasteData.split('').forEach((char, i) => {
            if (i < this.digits.length) {
              this.digits[i] = char
            }
          })
          
          if (pasteData.length === 6) {
            this.$refs.inputs[5].focus()
          } else {
            this.$refs.inputs[pasteData.length].focus()
          }
        }
      },
      verifyCode() {
        if (!this.isCodeComplete) {
          this.error = 'Por favor, preencha todos os dígitos'
          return
        }
        
        this.isVerifying = true
        // Simulação de verificação
        setTimeout(() => {
          this.isVerifying = false
          const code = this.digits.join('')
          // Aqui você faria a verificação real do código
          console.log('Código verificado:', code)
        }, 1500)
      },
      resendCode() {
        if (this.isResending || this.countdown > 0) return
        
        this.isResending = true
        // Simulação de reenvio
        setTimeout(() => {
          this.isResending = false
          this.countdown = 30
          this.startCountdown()
          console.log('Código reenviado')
        }, 1000)
      },
      startCountdown() {
        const timer = setInterval(() => {
          this.countdown--
          if (this.countdown <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      },
      goToLogin() {
        this.$router.push('/login')
      }
    },
    mounted() {
      this.startCountdown()
      if (this.$refs.inputs && this.$refs.inputs[0]) {
        this.$refs.inputs[0].focus()
      }
    }
  }
  </script>