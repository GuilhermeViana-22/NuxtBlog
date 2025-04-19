<template>
    <!-- Navbar (mantida do template original) -->
    <nav class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <Navbar />
    </nav>
  
    <!-- Conteúdo principal do dashboard -->
    <main class="min-h-screen bg-gray-900 text-white">
      <div class="container mx-auto px-4 py-8">
        <!-- Cabeçalho do perfil -->
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Seção de avatar e informações básicas -->
          <div class="w-full md:w-1/3 lg:w-1/4">
            <div class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
              <!-- Avatar e nome -->
              <div class="flex flex-col items-center mb-6">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500 mb-4">
                  <img :src="userAvatar" alt="User Avatar" class="w-full h-full object-cover">
                </div>
                <h1 class="text-2xl font-bold">{{ user.name }}</h1>
                <p class="text-gray-400">@{{ user.username }}</p>
              </div>
  
              <!-- Estatísticas -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="text-center">
                  <p class="text-2xl font-bold">{{ userStats.posts }}</p>
                  <p class="text-gray-400 text-sm">Posts</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold">{{ userStats.followers }}</p>
                  <p class="text-gray-400 text-sm">Seguidores</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold">{{ userStats.following }}</p>
                  <p class="text-gray-400 text-sm">Seguindo</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold">{{ userStats.likes }}</p>
                  <p class="text-gray-400 text-sm">Curtidas</p>
                </div>
              </div>
  
              <!-- Botões de ação -->
              <div class="space-y-3">
                <button @click="editProfile" class="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Perfil
                </button>
                <button @click="newPost" class="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Novo Post
                </button>
                <button @click="logout" class="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </button>
              </div>
  
              <!-- Informações do usuário -->
              <div class="mt-6 space-y-2">
                <div class="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{{ user.email }}</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ user.location || 'Não informado' }}</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Membro desde {{ joinDate }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Conteúdo principal -->
          <div class="w-full md:w-2/3 lg:w-3/4">
            <!-- Abas -->
            <div class="border-b border-gray-700 mb-6">
              <nav class="flex space-x-8">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id" 
                  @click="activeTab = tab.id"
                  :class="{
                    'border-green-500 text-green-400': activeTab === tab.id,
                    'border-transparent text-gray-400 hover:text-gray-300': activeTab !== tab.id
                  }"
                  class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  {{ tab.label }}
                </button>
              </nav>
            </div>
  
            <!-- Conteúdo das abas -->
            <div>
              <!-- Posts -->
              <div v-if="activeTab === 'posts'" class="space-y-6">
                <div v-for="post in userPosts" :key="post.id" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                  <div class="flex justify-between items-start mb-4">
                    <h2 class="text-xl font-bold hover:text-green-400 cursor-pointer">{{ post.title }}</h2>
                    <div class="flex space-x-2">
                      <button @click="editPost(post.id)" class="text-gray-400 hover:text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="deletePost(post.id)" class="text-gray-400 hover:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-gray-300 mb-4">{{ post.excerpt }}</p>
                  <div class="flex justify-between items-center text-sm text-gray-400">
                    <div class="flex space-x-4">
                      <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ post.date }}
                      </span>
                      <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        {{ post.comments }} comentários
                      </span>
                    </div>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {{ post.likes }} curtidas
                    </span>
                  </div>
                </div>
  
                <div v-if="userPosts.length === 0" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 text-center">
                  <p class="text-gray-400">Você ainda não publicou nenhum post.</p>
                  <button @click="newPost" class="mt-4 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition-colors">
                    Criar meu primeiro post
                  </button>
                </div>
              </div>
  
              <!-- Comentários -->
              <div v-if="activeTab === 'comments'" class="space-y-6">
                <div v-for="comment in userComments" :key="comment.id" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-sm font-medium text-gray-400">Em resposta a <a href="#" class="text-green-400 hover:underline">{{ comment.postTitle }}</a></h3>
                    <button @click="deleteComment(comment.id)" class="text-gray-400 hover:text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p class="text-gray-300 mb-4">{{ comment.content }}</p>
                  <div class="flex justify-between items-center text-sm text-gray-400">
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ comment.date }}
                    </span>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {{ comment.likes }} curtidas
                    </span>
                  </div>
                </div>
  
                <div v-if="userComments.length === 0" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 text-center">
                  <p class="text-gray-400">Você ainda não fez nenhum comentário.</p>
                </div>
              </div>
  
              <!-- Favoritos -->
              <div v-if="activeTab === 'favorites'" class="space-y-6">
                <div v-for="favorite in userFavorites" :key="favorite.id" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                  <h3 class="text-lg font-bold hover:text-green-400 cursor-pointer mb-2">{{ favorite.title }}</h3>
                  <p class="text-sm text-gray-400 mb-2">Por <a href="#" class="text-green-400 hover:underline">{{ favorite.author }}</a></p>
                  <p class="text-gray-300 mb-4">{{ favorite.excerpt }}</p>
                  <div class="flex justify-between items-center text-sm text-gray-400">
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ favorite.date }}
                    </span>
                    <button @click="removeFavorite(favorite.id)" class="text-gray-400 hover:text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remover
                    </button>
                  </div>
                </div>
  
                <div v-if="userFavorites.length === 0" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 text-center">
                  <p class="text-gray-400">Você ainda não favoritou nenhum post.</p>
                </div>
              </div>
  
              <!-- Configurações -->
              <div v-if="activeTab === 'settings'" class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                <h2 class="text-xl font-bold mb-6">Configurações da Conta</h2>
                
                <form @submit.prevent="updateSettings">
                  <div class="space-y-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nome completo</label>
                      <input type="text" id="name" v-model="settings.name" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label for="username" class="block text-sm font-medium text-gray-300 mb-1">Nome de usuário</label>
                      <input type="text" id="username" v-model="settings.username" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
                      <input type="email" id="email" v-model="settings.email" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label for="bio" class="block text-sm font-medium text-gray-300 mb-1">Biografia</label>
                      <textarea id="bio" v-model="settings.bio" rows="3" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
                    </div>
                    
                    <div>
                      <label for="location" class="block text-sm font-medium text-gray-300 mb-1">Localização</label>
                      <input type="text" id="location" v-model="settings.location" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-300 mb-2">Foto de perfil</label>
                      <div class="flex items-center">
                        <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 mr-4">
                          <img :src="userAvatar" alt="User Avatar" class="w-full h-full object-cover">
                        </div>
                        <div>
                          <input type="file" id="avatar" accept="image/*" class="hidden" @change="handleAvatarUpload">
                          <label for="avatar" class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors cursor-pointer inline-block">
                            Alterar foto
                          </label>
                          <p class="text-xs text-gray-400 mt-1">Formatos: JPG, PNG (Máx. 2MB)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="border-t border-gray-700 pt-6">
                      <h3 class="text-lg font-medium text-gray-300 mb-4">Alterar senha</h3>
                      
                      <div class="space-y-4">
                        <div>
                          <label for="current_password" class="block text-sm font-medium text-gray-300 mb-1">Senha atual</label>
                          <input type="password" id="current_password" v-model="settings.current_password" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        </div>
                        
                        <div>
                          <label for="new_password" class="block text-sm font-medium text-gray-300 mb-1">Nova senha</label>
                          <input type="password" id="new_password" v-model="settings.new_password" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        </div>
                        
                        <div>
                          <label for="new_password_confirmation" class="block text-sm font-medium text-gray-300 mb-1">Confirmar nova senha</label>
                          <input type="password" id="new_password_confirmation" v-model="settings.new_password_confirmation" class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex justify-end">
                      <button type="submit" class="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded-md transition-colors">
                        Salvar alterações
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useAuthStore } from '../stores/useAuthStore'
  import Navbar from '@/components/Navbar.vue';
  const authStore = useAuthStore()
  
  // Dados do usuário (simulados)
  const user = ref({
    name: 'João da Silva',
    username: 'joaosilva',
    email: 'joao@example.com',
    location: 'São Paulo, Brasil',
    joinDate: '2023-01-15'
  })
  
  // Estatísticas do usuário
  const userStats = ref({
    posts: 12,
    followers: 345,
    following: 278,
    likes: 1245
  })
  
  // Abas do dashboard
  const tabs = ref([
    { id: 'posts', label: 'Meus Posts' },
    { id: 'comments', label: 'Comentários' },
    { id: 'favorites', label: 'Favoritos' },
    { id: 'settings', label: 'Configurações' }
  ])
  
  const activeTab = ref('posts')
  
  // Posts do usuário (simulados)
  const userPosts = ref([
    {
      id: 1,
      title: 'Como começar com Nuxt.js e Tailwind CSS',
      excerpt: 'Neste artigo, vou mostrar como configurar um projeto Nuxt.js com Tailwind CSS do zero...',
      date: '15 de Mar, 2023',
      comments: 8,
      likes: 42
    },
    {
      id: 2,
      title: 'O poder da composição no Vue 3',
      excerpt: 'A API de composição no Vue 3 trouxe uma nova forma de organizar nossa lógica...',
      date: '28 de Fev, 2023',
      comments: 5,
      likes: 31
    }
  ])
  
  // Comentários do usuário (simulados)
  const userComments = ref([
    {
      id: 1,
      postTitle: 'Introdução ao Vue 3',
      content: 'Ótimo artigo! Gostei especialmente da parte sobre a API de composição.',
      date: '10 de Mar, 2023',
      likes: 3
    }
  ])
  
  // Favoritos do usuário (simulados)
  const userFavorites = ref([
    {
      id: 1,
      title: 'Dominando o Pinia para gerenciamento de estado',
      author: 'Maria Oliveira',
      excerpt: 'Pinia é a solução oficial de gerenciamento de estado para Vue e oferece...',
      date: '5 de Mar, 2023'
    }
  ])
  
  // Configurações
  const settings = ref({
    name: user.value.name,
    username: user.value.username,
    email: user.value.email,
    bio: 'Desenvolvedor front-end apaixonado por Vue.js e Nuxt.js',
    location: user.value.location,
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  })
  
  // Avatar do usuário (usando o mesmo do template original)
  const userAvatar = computed(() => {
    const seed = authStore.token || 'default'
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&radius=50&backgroundColor=ffffff`
  })
  
  // Data de entrada formatada
  const joinDate = computed(() => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(user.value.joinDate).toLocaleDateString('pt-BR', options)
  })
  
  // Métodos
  const editProfile = () => {
    activeTab.value = 'settings'
  }
  
  const newPost = () => {
    // Navegar para a página de criação de post
    console.log('Navegar para novo post')
  }
  
  const logout = () => {
    authStore.logout()
    // Redirecionar para a página inicial
    console.log('Logout realizado')
  }
  
  const editPost = (postId) => {
    console.log('Editar post:', postId)
  }
  
  const deletePost = (postId) => {
    console.log('Deletar post:', postId)
    userPosts.value = userPosts.value.filter(post => post.id !== postId)
  }
  
  const deleteComment = (commentId) => {
    console.log('Deletar comentário:', commentId)
    userComments.value = userComments.value.filter(comment => comment.id !== commentId)
  }
  
  const removeFavorite = (favoriteId) => {
    console.log('Remover favorito:', favoriteId)
    userFavorites.value = userFavorites.value.filter(favorite => favorite.id !== favoriteId)
  }
  
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('Arquivo selecionado:', file.name)
      // Aqui você faria o upload do arquivo para o servidor
    }
  }
  
  const updateSettings = () => {
    console.log('Configurações atualizadas:', settings.value)
    // Atualizar dados do usuário
    user.value.name = settings.value.name
    user.value.username = settings.value.username
    user.value.email = settings.value.email
    user.value.location = settings.value.location
    
    // Mostrar mensagem de sucesso
    alert('Configurações salvas com sucesso!')
  }
  </script>
  
  <style scoped>
  /* Estilos adicionais podem ser adicionados aqui */
  </style>