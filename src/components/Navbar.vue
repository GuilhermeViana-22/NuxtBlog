<template>
  <nav class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <router-link to="/" class="text-2xl font-bold text-white">
          <span class="text-green-400">Nuxt</span>Blog
        </router-link>

        <!-- Barra de pesquisa (desktop) -->
        <div class="hidden md:block relative w-64">
          <input 
            type="text" 
            placeholder="Pesquisar..."
            class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
          >
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Links de navegação (desktop) -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="text-gray-300 hover:text-green-400 transition-colors">Início</router-link>
        <router-link to="#" class="text-gray-300 hover:text-green-400 transition-colors">Artigos</router-link>
        <router-link to="#" class="text-gray-300 hover:text-green-400 transition-colors">Podcasts</router-link>
      </div>

      <!-- Área de autenticação -->
      <div class="flex items-center space-x-3">
        <template v-if="authStore.isAuthenticated">
          <!-- Usuário autenticado -->
          <router-link 
            to="/novo-post"
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Criar Post
          </router-link>
          
          <!-- Dropdown do usuário -->
          <div class="relative">
            <button @click="toggleUserMenu" class="focus:outline-none">
              <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img :src="userAvatar" alt="Avatar" class="w-full h-full object-cover">
              </div>
            </button>
            
            <div 
              v-show="isUserMenuOpen" 
              class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
            >
              <router-link 
                to="/perfil" 
                class="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                @click="isUserMenuOpen = false"
              >
                Meu Perfil
              </router-link>
              <button 
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Sair
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <!-- Usuário não autenticado -->
          <router-link 
            to="/login"
            class="hidden md:block border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition-colors"
          >
            Entrar
          </router-link>

          <router-link 
            to="/register"
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Cadastrar
          </router-link>
        </template>

        <!-- Botão mobile -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-show="isMobileMenuOpen" class="md:hidden bg-gray-800 border-t border-gray-700">
      <div class="container mx-auto px-4 py-3 flex flex-col space-y-4">
        <router-link 
          to="/" 
          class="text-gray-300 hover:text-green-400 transition-colors py-2"
          @click="isMobileMenuOpen = false"
        >
          Início
        </router-link>
        <router-link 
          to="#" 
          class="text-gray-300 hover:text-green-400 transition-colors py-2"
          @click="isMobileMenuOpen = false"
        >
          Artigos
        </router-link>
        <router-link 
          to="/login"
          class="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition-colors w-full text-center"
          @click="isMobileMenuOpen = false"
          v-if="!authStore.isAuthenticated"
        >
          Entrar
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

// Avatar do usuário
const userAvatar = computed(() => {
  const seed = authStore.token || 'default'
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&radius=50`
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    isUserMenuOpen.value = false
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>

<style scoped>
/* Transição suave para o dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>