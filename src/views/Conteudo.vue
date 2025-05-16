<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Coluna Principal (2/3) -->
        <div class="lg:col-span-2">
          <h1 class="text-3xl font-bold mb-8 gradient-text">Posts Recentes</h1>

          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>

          <div v-else class="space-y-8">
            <div v-for="post in posts" :key="post.id"
              class="post-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative border border-gray-700 hover:border-green-400/20">
              <!-- Efeito de raio sutil -->
              <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="green-ray-effect"></div>
              </div>

              <!-- Imagem do Post -->
              <div v-if="post.image_url" class="h-64 w-full overflow-hidden relative">
                <img :src="post.image_url" :alt="post.title"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
              </div>

              <!-- Conteúdo do Post -->
              <div class="p-6 relative">
                <div class="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                  <span>{{ calculateReadingTime(post.body) }} min de leitura</span>
                  <span>•</span>
                  <span>{{ formatDate(post.created_at) }}</span>
                </div>

                <h2 class="text-2xl font-bold mb-3 hover:text-primary-400 transition-colors">
                  <span class="relative group">
                    {{ post.title }}
                    <span
                      class="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </h2>

                <p class="text-gray-300 mb-4">{{ post.subtitle }}</p>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span v-for="tagId in post.tags_id" :key="tagId"
                      class="text-xs bg-gray-700/80 text-gray-300 px-3 py-1 rounded-full hover:bg-green-500/30 transition-colors">
                      {{ getTagName(tagId) }}
                    </span>
                  </div>

                  <router-link :to="`/post/${post.id}`"
                    class="text-primary-400 hover:text-primary-300 flex items-center group">
                    <span>Ler mais</span>
                    <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
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
          <Sobre />

          <!-- Tags Populares -->
          <div
            class="bg-gray-800 rounded-lg p-6 relative overflow-hidden border border-gray-700 hover:border-green-400/20">
            <div class="green-ray-effect"></div>
            <h3 class="text-xl font-bold mb-4 gradient-text relative z-10">Tags Populares</h3>
            <div class="flex flex-wrap gap-2 relative z-10">
              <span v-for="tag in popularTags" :key="tag.id"
                class="text-xs bg-gray-700/80 text-gray-300 px-3 py-1 rounded-full hover:bg-green-500/30 hover:text-white transition-colors cursor-pointer">
                {{ tag.name }}
              </span>
            </div>
          </div>

          <!-- Newsletter -->
          <div
            class="bg-gray-800 rounded-lg p-6 relative overflow-hidden border border-gray-700 hover:border-green-400/20">
            <div class="green-ray-effect"></div>
            <h3 class="text-xl font-bold mb-4 gradient-text relative z-10">Newsletter</h3>
            <p class="text-gray-300 mb-4 relative z-10">Assine nossa newsletter para receber os melhores artigos
              diretamente no seu e-mail.</p>
            <div class="flex relative z-10">
              <input type="email" placeholder="Seu e-mail"
                class="flex-grow bg-gray-700/80 border border-gray-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors">
              <button class="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition-colors">
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
import api from '@/services/api'
import Sobre from '@/components/Sobre.vue'

export default {
  name: 'Conteudo',
  components: {
    Sobre
  },
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
    this.initRayEffects()
  },
  methods: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await api.get('/post')
        if (response.data && Array.isArray(response.data.posts)) {
          this.posts = response.data.posts
        } else {
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
    },

    initRayEffects() {
      const createRay = (element) => {
        if (!element) return

        const ray = document.createElement('div')
        ray.className = 'green-ray'

        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const angle = Math.random() * 360
        const duration = 1 + Math.random() * 2 // Intervalos maiores (1-3s)

        ray.style.setProperty('--x', `${posX}%`)
        ray.style.setProperty('--y', `${posY}%`)
        ray.style.setProperty('--angle', `${angle}deg`)
        ray.style.setProperty('--duration', `${duration}s`)

        element.appendChild(ray)

        setTimeout(() => {
          ray.remove()
        }, duration * 1000)
      }

      const animateElements = () => {
        document.querySelectorAll('.green-ray-effect').forEach(el => {
          // Menos frequente (20% de chance de animar a cada ciclo)
          if (Math.random() < 0.2) {
            createRay(el)
          }
        })
      }

      // Intervalo maior (5-8 segundos)
      const minInterval = 5000
      const maxInterval = 8000

      const animateWithRandomInterval = () => {
        animateElements()
        setTimeout(animateWithRandomInterval, minInterval + Math.random() * (maxInterval - minInterval))
      }

      animateWithRandomInterval()
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
  display: inline;
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

/* Efeitos de raios verdes */
.green-ray {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, rgba(74, 222, 128, 0), #4ade80, rgba(74, 222, 128, 0));
  transform: rotate(var(--angle));
  transform-origin: left center;
  filter: drop-shadow(0 0 3px rgba(74, 222, 128, 0.5));
  animation: rayAnimation var(--duration) ease-out forwards;
  opacity: 0;
  z-index: 0;
}

@keyframes rayAnimation {
  0% {
    opacity: 0;
    width: 0;
  }

  30% {
    opacity: 0.6;
  }

  100% {
    opacity: 0;
    width: 80px;
  }
}

.post-card:hover {
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.1);
}

.green-ray-effect {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* Efeito de brilho sutil nos cantos */
.post-card::before,
.bg-gray-800.rounded-lg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.post-card:hover::before,
.bg-gray-800.rounded-lg:hover::before {
  opacity: 1;
}

.post-card::after,
.bg-gray-800.rounded-lg::after {
  content: '';
  position: absolute;
  bottom: -50%;
  right: -50%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.post-card:hover::after,
.bg-gray-800.rounded-lg:hover::after {
  opacity: 1;
}
</style>