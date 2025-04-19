<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const postId = route.params.id

// Estados do componente
const post = ref(null)
const loading = ref(true)
const comments = ref([])
const newComment = ref('')
const isLiked = ref(false)
const isBookmarked = ref(false)
const likesCount = ref(0)
const error = ref(null)

// Dados do mock (substituir por API real)
const fetchPost = async () => {
  try {
    loading.value = true
    const response = await axios.get(`http://127.0.0.1:8001/api/post/${postId}`)
    
    if (response.data) {
      post.value = response.data.post || response.data
      likesCount.value = post.value.likes || 0
      
      // Simular comentários (substituir por chamada real)
      comments.value = [
        { id: 1, author: 'DevMaster', content: 'Ótimo artigo! Me ajudou muito com um problema que estava tendo.', date: '2023-05-15T10:30:00' },
        { id: 2, author: 'CodeNinja', content: 'Parabéns pelo conteúdo detalhado. Alguma dica para performance?', date: '2023-05-16T14:45:00' },
        { id: 3, author: 'WebArtisan', content: 'Estou começando com Nuxt e isso foi muito esclarecedor!', date: '2023-05-17T09:15:00' }
      ]
    }
  } catch (err) {
    error.value = 'Não foi possível carregar o post'
    console.error('Erro ao buscar post:', err)
  } finally {
    loading.value = false
  }
}

// Interações
const toggleLike = async () => {
  try {
    isLiked.value = !isLiked.value
    likesCount.value += isLiked.value ? 1 : -1
    
    // Simular chamada API
    await axios.post(`/api/posts/${postId}/like`, { liked: isLiked.value })
  } catch (err) {
    console.error('Erro ao atualizar like:', err)
    // Reverter em caso de erro
    isLiked.value = !isLiked.value
    likesCount.value += isLiked.value ? -1 : 1
  }
}

const toggleBookmark = async () => {
  try {
    isBookmarked.value = !isBookmarked.value
    
    // Simular chamada API
    await axios.post(`/api/posts/${postId}/bookmark`, { bookmarked: isBookmarked.value })
  } catch (err) {
    console.error('Erro ao atualizar bookmark:', err)
    isBookmarked.value = !isBookmarked.value
  }
}

const addComment = async () => {
  if (!newComment.value.trim()) return
  
  try {
    const comment = {
      id: Date.now(), // ID temporário
      author: 'Você', // Substituir por usuário real
      content: newComment.value,
      date: new Date().toISOString()
    }
    
    // Adiciona localmente (otimista)
    comments.value.unshift(comment)
    newComment.value = ''
    
    // Simular chamada API
    await axios.post(`/api/posts/${postId}/comments`, { 
      content: comment.content 
    })
    
    // Aqui você atualizaria o comentário com dados reais da API
  } catch (err) {
    console.error('Erro ao adicionar comentário:', err)
    // Remove o comentário em caso de erro
    comments.value = comments.value.filter(c => c.id !== comment.id)
  }
}

// Efeitos de raios verdes
onMounted(() => {
  fetchPost()
  
  // Efeito de raios no post
  const postContainer = document.querySelector('.post-container')
  
  const createPostRay = () => {
    if (!postContainer) return
    
    const ray = document.createElement('div')
    ray.className = 'post-ray'
    
    const posX = Math.random() * 100
    const posY = 10 + Math.random() * 80 // Evitar cantos
    const angle = -15 + Math.random() * 30 // Ângulo mais contido
    const duration = 1.5 + Math.random() * 1.5
    
    ray.style.setProperty('--x', `${posX}%`)
    ray.style.setProperty('--y', `${posY}%`)
    ray.style.setProperty('--angle', `${angle}deg`)
    ray.style.setProperty('--duration', `${duration}s`)
    
    postContainer.appendChild(ray)
    
    setTimeout(() => {
      ray.remove()
    }, duration * 1000)
  }
  
  const animatePostRays = () => {
    if (Math.random() < 0.25) { // 25% de chance
      createPostRay()
    }
    setTimeout(animatePostRays, 10000 + Math.random() * 5000) // 10-15s
  }
  
  setTimeout(animatePostRays, 5000)
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Efeito de loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
      
      <!-- Erro ao carregar -->
      <div v-else-if="error" class="text-center py-20 text-red-400">
        {{ error }}
      </div>
      
      <!-- Conteúdo do post -->
      <div v-else class="post-container relative">
        <!-- Raios serão injetados aqui via JS -->
        
        <!-- Cabeçalho -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2 text-sm text-gray-400">
              <span>{{ calculateReadingTime(post.body) }} min de leitura</span>
              <span>•</span>
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
            
            <div class="flex space-x-2">
              <button 
                @click="toggleLike"
                class="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
                :class="{ 'text-red-500': isLiked }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ likesCount }}</span>
              </button>
              
              <button 
                @click="toggleBookmark"
                class="text-gray-400 hover:text-yellow-500 transition-colors"
                :class="{ 'text-yellow-500': isBookmarked }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {{ post.title }}
          </h1>
          
          <p class="text-xl text-gray-300 mb-6">{{ post.subtitle }}</p>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span 
              v-for="tagId in post.tags_id" 
              :key="tagId"
              class="text-xs bg-gray-700/80 text-gray-300 px-3 py-1 rounded-full hover:bg-green-500/30 transition-colors"
            >
              {{ getTagName(tagId) }}
            </span>
          </div>
        </div>
        
        <!-- Imagem destacada -->
        <div v-if="post.image_url" class="mb-8 rounded-lg overflow-hidden relative h-64 md:h-80">
          <img 
            :src="post.image_url" 
            :alt="post.title" 
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
        </div>
        
        <!-- Conteúdo -->
        <div class="prose prose-invert max-w-none mb-12">
          <!-- Aqui viria o conteúdo formatado do post -->
          <div v-html="post.body"></div>
        </div>
        
        <!-- Ações -->
        <div class="flex justify-center space-x-6 mb-12">
          <button 
            @click="toggleLike"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            :class="isLiked ? 'bg-red-500/10 text-red-500' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{{ isLiked ? 'Curtiu!' : 'Curtir' }}</span>
            <span class="text-xs opacity-80">{{ likesCount }}</span>
          </button>
          
          <button 
            @click="toggleBookmark"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            :class="isBookmarked ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>{{ isBookmarked ? 'Salvo!' : 'Salvar' }}</span>
          </button>
        </div>
        
        <!-- Seção de comentários -->
        <div class="border-t border-gray-700 pt-8">
          <h3 class="text-xl font-bold mb-6 gradient-text flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comentários
            <span class="text-sm text-gray-400 ml-2">{{ comments.length }}</span>
          </h3>
          
          <!-- Formulário de comentário -->
          <div class="mb-8 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <textarea
              v-model="newComment"
              placeholder="Adicione um comentário..."
              class="w-full bg-gray-700/50 border border-gray-600 rounded-md px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              rows="3"
            ></textarea>
            <div class="flex justify-end">
              <button
                @click="addComment"
                :disabled="!newComment.trim()"
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comentar
              </button>
            </div>
          </div>
          
          <!-- Lista de comentários -->
          <div class="space-y-6">
            <div 
              v-for="comment in comments" 
              :key="comment.id"
              class="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="font-medium text-green-400">{{ comment.author }}</div>
                <div class="text-xs text-gray-500">{{ formatDate(comment.date) }}</div>
              </div>
              <p class="text-gray-300">{{ comment.content }}</p>
              
              <!-- Ações do comentário -->
              <div class="flex justify-end space-x-4 mt-3 text-sm">
                <button class="text-gray-400 hover:text-green-400 transition-colors">Responder</button>
                <button class="text-gray-400 hover:text-green-400 transition-colors">Curtir</button>
              </div>
            </div>
            
            <!-- Sem comentários -->
            <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Efeito de raios no post */
.post-ray {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, rgba(74, 222, 128, 0), #4ade80, rgba(74, 222, 128, 0));
  transform: rotate(var(--angle));
  transform-origin: left center;
  filter: drop-shadow(0 0 2px rgba(74, 222, 128, 0.3));
  animation: postRayAnimation var(--duration) ease-out forwards;
  opacity: 0;
  z-index: 0;
}

@keyframes postRayAnimation {
  0% {
    opacity: 0;
    width: 0;
  }
  30% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    width: 100px;
  }
}

/* Estilos para o conteúdo do post */
.prose {
  color: #d1d5db;
}

.prose h2, 
.prose h3, 
.prose h4 {
  color: #f3f4f6;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose a {
  color: #4ade80;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}

.prose code {
  background-color: #1e293b;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
}

.prose pre {
  background-color: #1e293b;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
}

.prose img {
  border-radius: 0.5em;
  margin: 1em 0;
}

/* Efeitos de gradiente */
.gradient-text {
  background: linear-gradient(to right, #00DC82, #00C4A7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline;
}

/* Efeitos de hover */
button {
  transition: all 0.2s ease;
}

/* Responsividade */
@media (max-width: 768px) {
  .prose {
    font-size: 0.95rem;
  }
}
</style>