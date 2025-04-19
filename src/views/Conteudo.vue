<template>
    <div class="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
      <div class="container mx-auto px-4 py-8 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Coluna Principal (2/3) -->
          <div class="lg:col-span-2">
            <h1 class="text-3xl font-bold mb-8 gradient-text">Posts Recentes</h1>
            
            <div v-if="loading" class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
            
            <div v-else class="space-y-8">
              <div v-for="post in posts" :key="post.id" class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <!-- Imagem do Post -->
                <div v-if="post.image_url" class="h-64 w-full overflow-hidden">
                  <img 
                    :src="post.image_url" 
                    :alt="post.title" 
                    class="w-full h-full object-cover"
                  >
                </div>
                
                <!-- Conteúdo do Post -->
                <div class="p-6">
                  <div class="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                    <span>{{ calculateReadingTime(post.body) }} min de leitura</span>
                    <span>•</span>
                    <span>{{ formatDate(post.created_at) }}</span>
                  </div>
                  
                  <h2 class="text-2xl font-bold mb-3 hover:text-primary-400 transition-colors">
                    {{ post.title }}
                  </h2>
                  
                  <p class="text-gray-300 mb-4">{{ post.subtitle }}</p>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span 
                        v-for="tagId in post.tags_id" 
                        :key="tagId"
                        class="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
                      >
                        {{ getTagName(tagId) }}
                      </span>
                    </div>
                    
                    <router-link 
                      :to="`/post/${post.id}`" 
                      class="text-primary-400 hover:text-primary-300 flex items-center"
                    >
                      <span>Ler mais</span>
                      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar (1/3) -->
          <div class="lg:col-span-1 space-y-8">
            <!-- Sobre o Blog -->
            <div class="bg-gray-800 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-4 gradient-text">Sobre o TechBlog</h3>
              <p class="text-gray-300">Um lugar para desenvolvedores compartilharem conhecimento, experiências e se conectarem com outros profissionais.</p>
            </div>
            
            <!-- Tags Populares -->
            <div class="bg-gray-800 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-4 gradient-text">Tags Populares</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in popularTags" 
                  :key="tag.id"
                  class="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full hover:bg-primary-500 hover:text-white transition-colors cursor-pointer"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
            
            <!-- Newsletter -->
            <div class="bg-gray-800 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-4 gradient-text">Newsletter</h3>
              <p class="text-gray-300 mb-4">Assine nossa newsletter para receber os melhores artigos diretamente no seu e-mail.</p>
              <div class="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  class="flex-grow bg-gray-700 border border-gray-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                <button class="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'Conteudo',

    data() {
      return {
        posts: [],
        popularTags: [
          { id: 30, name: 'AR/VR' },
          { id: 32, name: 'Tecnologia' },
          { id: 1, name: 'JavaScript' },
          { id: 2, name: 'Vue' },
          { id: 3, name: 'React' }
        ],
        loading: true
      }
    },
    async mounted() {
      await this.fetchPosts()
    },
    methods: {
      async fetchPosts() {
        this.loading = true
        try {
          const response = await axios.get('http://127.0.0.1:8001/api/post')
          // Verifica se a resposta tem a estrutura esperada
          if (response.data && Array.isArray(response.data.posts)) {
            this.posts = response.data.posts
          } else {
            // Se não tiver a estrutura esperada, assume que o array está no root
            this.posts = Array.isArray(response.data) ? response.data : []
          }
        } catch (error) {
          console.error('Erro ao buscar posts:', error)
          this.$toast.error('Não foi possível carregar os posts', {
            position: 'top-right',
            duration: 3000
          })
        } finally {
          this.loading = false
        }
      },
      
      formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' }
        return new Date(dateString).toLocaleDateString('pt-BR', options)
      },
      
      calculateReadingTime(content) {
        if (!content) return 5
        const wordsPerMinute = 200
        const wordCount = content.split(/\s+/).length
        return Math.ceil(wordCount / wordsPerMinute) || 5
      },
      
      getTagName(tagId) {
        const tag = this.popularTags.find(t => t.id === tagId)
        return tag ? tag.name : `#${tagId}`
      }
    }
  }
  </script>
  
  <style>
  .gradient-text {
    background-image: linear-gradient(to right, #3de49e, #00c777);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .bg-gray-900 {
    background-color: #020618;
  }
  
  .bg-gray-800 {
    background-color: #1a2b40;
  }
  
  .bg-gray-700 {
    background-color: #283951;
  }
  
  .border-gray-600 {
    border-color: #4d5a6b;
  }
  
  .text-gray-300 {
    color: #d1d5db;
  }
  
  .text-gray-400 {
    color: #9ca3af;
  }
  
  .bg-primary-500 {
    background-color: #00c777;
  }
  
  .hover\:bg-primary-600:hover {
    background-color: #009c5d;
  }
  
  .text-primary-400 {
    color: #3de49e;
  }
  
  .hover\:text-primary-300:hover {
    color: #67e9b2;
  }
  </style>