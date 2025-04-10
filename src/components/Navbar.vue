<template>
  <!-- Navbar -->
  <nav class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <a href="#" class="text-2xl font-bold text-white">
          <span class="text-green-400">Nuxt</span>Blog
        </a>
        
        <!-- Search Bar -->
        <div class="hidden md:block relative w-64">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
          >
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center space-x-6">
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">Início</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">Artigos</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">Podcasts</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">Tags</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">Listas</a>
      </div>
      
      <!-- Auth Buttons -->
      <div class="flex items-center space-x-3">
   
        <router-link to="/login" class="hidden md:block border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition-colors">
          Entrar
        </router-link>  


        <router-link to="/register" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          Cadastrar
        </router-link>  
        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-gray-300 hover:text-white focus:outline-none">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen" class="md:hidden bg-gray-800 border-t border-gray-700">
      <div class="container mx-auto px-4 py-3 flex flex-col space-y-4">
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors py-2">Início</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors py-2">Artigos</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors py-2">Podcasts</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors py-2">Tags</a>
        <a href="#" class="text-gray-300 hover:text-green-400 transition-colors py-2">Listas</a>
        <router-link to="/login" class="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition-colors w-full">
          Entrar
        </router-link>  
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    }
  }
}
</script>

<style scoped>
/* Estilos específicos se necessário */
</style>