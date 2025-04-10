<template>
  <div class="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4">
          </path>
        </svg>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
        Acesse sua conta
      </h2>
      <p class="mt-2 text-center text-sm text-gray-300">
        Ou
        <router-link to="/register" class="font-medium text-green-400 hover:text-green-300 transition-colors">
          crie uma nova conta
        </router-link>
      </p>
    </div>

    <!-- Form Container -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-800 py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-700">
        <!-- Form -->
        <form class="mb-0 space-y-6" @submit.prevent="handleLogin">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
            <div class="mt-1">
              <input id="email" type="email" v-model="form.email" required
                class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="seu@email.com" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">Senha</label>
            <div class="mt-1">
              <input id="password" type="password" v-model="form.password" required
                class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="••••••••" />
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" v-model="form.remember"
                class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded bg-gray-700" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-300">Lembrar de mim</label>
            </div>

            <div class="text-sm">
              <router-link to="/forgot-password"
                class="font-medium text-green-400 hover:text-green-300 transition-colors">
                Esqueceu sua senha?
              </router-link>
            </div>
          </div>

          <!-- Submit -->
          <div>
            <button type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              :disabled="isLoggingIn">
              <span v-if="!isLoggingIn">Entrar</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Entrando...
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
              <span class="px-2 bg-gray-800 text-gray-400">Ou continue com</span>
            </div>
          </div>
        </div>

        <!-- Social -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <a href="#"
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489..." clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#"
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675..." />
            </svg>
          </a>
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
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      isLoggingIn: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoggingIn = true
      // lógica de login aqui
      setTimeout(() => {
        this.isLoggingIn = false
        // redirecionamento ou erro...
      }, 2000)
    }
  }
}
</script>
