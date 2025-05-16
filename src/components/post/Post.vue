<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import PostHeader from '@/components/post/PostHeader.vue'
import PostContent from '@/components/post/PostContent.vue'
import PostActions from '@/components/post/PostActions.vue'
import CommentsSection from '@/components/post/CommentsSection.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import Navbar from '@/components/Navbar.vue';



const route = useRoute()
const postId = route.params.id || 7 // Usa o ID da rota ou o padrão 7

// Estados reativos
const post = ref(null)
const loading = ref(true)
const comments = ref([])
const newComment = ref('')
const isLiked = ref(false)
const isBookmarked = ref(false)
const likesCount = ref(0)
const error = ref(null)

/**
 * Busca o post específico da API
 */
const fetchPost = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Chamada à API corrigida para lidar com o formato de resposta
    const response = await api.get(`/post?id=${postId}`)
    console.log('Resposta completa da API:', response.data)
    
    if (!response.data?.posts || response.data.posts.length === 0) {
      throw new Error('Post não encontrado')
    }

    // Extrai o primeiro post do array (mesmo que só tenha um)
    const [postData] = response.data.posts
    post.value = postData
    
    // Carrega informações adicionais
    likesCount.value = post.value.likes || 0
    isLiked.value = post.value.is_liked || false
    isBookmarked.value = post.value.is_bookmarked || false
    
    // Formata a data para exibição
    if (post.value.created_at) {
      post.value.formatted_date = formatDate(post.value.created_at)
    }
    
    // Carrega comentários
    await fetchComments()
    
  } catch (err) {
    console.error('Erro ao buscar post:', err)
    error.value = err.response?.data?.message || err.message || 'Não foi possível carregar o post'
  } finally {
    loading.value = false
  }
}

/**
 * Formata a data para exibição
 */
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

/**
 * Busca comentários do post
 */
const fetchComments = async () => {
  try {
    const response = await api.get(`/post/${postId}/comments`)
    
    // Formata os comentários com datas legíveis
    comments.value = (response.data || []).map(comment => ({
      ...comment,
      formatted_date: formatDate(comment.date || comment.created_at)
    }))
    
  } catch (err) {
    console.error('Erro ao buscar comentários:', err)
    // Comentários mockados de fallback
    comments.value = [
      { 
        id: 1, 
        author: 'DevMaster', 
        content: 'Ótimo artigo!', 
        date: '2023-05-15T10:30:00',
        formatted_date: formatDate('2023-05-15T10:30:00')
      },
      { 
        id: 2, 
        author: 'CodeNinja', 
        content: 'Parabéns pelo conteúdo!', 
        date: '2023-05-16T14:45:00',
        formatted_date: formatDate('2023-05-16T14:45:00')
      }
    ]
  }
}

/**
 * Gerencia like/unlike do post
 */
const toggleLike = async () => {
  try {
    const wasLiked = isLiked.value
    isLiked.value = !wasLiked
    likesCount.value += wasLiked ? -1 : 1
    
    await api.post(`/post/${postId}/like`, { 
      action: wasLiked ? 'unlike' : 'like' 
    })
    
  } catch (err) {
    console.error('Erro ao atualizar like:', err)
    // Reverte em caso de erro
    isLiked.value = !isLiked.value
    likesCount.value += isLiked.value ? -1 : 1
  }
}

/**
 * Gerencia bookmark/unbookmark do post
 */
const toggleBookmark = async () => {
  try {
    isBookmarked.value = !isBookmarked.value
    await api.post(`/post/${postId}/bookmark`, { 
      bookmarked: isBookmarked.value 
    })
  } catch (err) {
    console.error('Erro ao atualizar bookmark:', err)
    // Reverte em caso de erro
    isBookmarked.value = !isBookmarked.value
  }
}

/**
 * Adiciona novo comentário
 */
const addComment = async () => {
  if (!newComment.value.trim()) return
  
  try {
    const commentContent = newComment.value.trim()
    newComment.value = '' // Limpa o campo
    
    // Adição otimista
    const tempComment = {
      id: 'temp-' + Date.now(),
      author: 'Você',
      content: commentContent,
      date: new Date().toISOString(),
      formatted_date: 'Agora mesmo',
      isPending: true
    }
    
    comments.value.unshift(tempComment)
    
    // Envia para API
    const response = await api.post(`/post/${postId}/comments`, { 
      content: commentContent 
    })
    
    // Substitui o comentário temporário pelo real
    const index = comments.value.findIndex(c => c.id === tempComment.id)
    if (index !== -1) {
      comments.value[index] = {
        ...response.data,
        formatted_date: formatDate(response.data.date || response.data.created_at)
      }
    }
    
  } catch (err) {
    console.error('Erro ao adicionar comentário:', err)
    // Remove o comentário temporário em caso de erro
    comments.value = comments.value.filter(c => !c.isPending)
  }
}

// Efeitos
onMounted(() => {
  fetchPost()
  setupPostRaysEffect()
})

/**
 * Configura efeitos visuais de raios
 */
const setupPostRaysEffect = () => {
  const postContainer = document.querySelector('.post-container')
  if (!postContainer) return
  
  const createRay = () => {
    const ray = document.createElement('div')
    ray.className = 'post-ray'
    
    const posX = Math.random() * 100
    const posY = 10 + Math.random() * 80
    const angle = -15 + Math.random() * 30
    const duration = 1.5 + Math.random() * 1.5
    
    ray.style.setProperty('--x', `${posX}%`)
    ray.style.setProperty('--y', `${posY}%`)
    ray.style.setProperty('--angle', `${angle}deg`)
    ray.style.setProperty('--duration', `${duration}s`)
    
    postContainer.appendChild(ray)
    
    setTimeout(() => ray.remove(), duration * 1000)
  }
  
  const animateRays = () => {
    if (Math.random() < 0.25) createRay()
    setTimeout(animateRays, 10000 + Math.random() * 5000)
  }
  
  setTimeout(animateRays, 5000)
}
</script>

<template>
      <Navbar />
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Estado de loading -->
      <LoadingSpinner v-if="loading" />
      
      <!-- Mensagem de erro -->
      <ErrorMessage 
        v-else-if="error" 
        :message="error"
        class="py-20"
      />
      
      <!-- Post não encontrado -->
      <ErrorMessage 
        v-else-if="!post && !loading"
        message="Post não encontrado"
        class="py-20"
      />
      
      <!-- Conteúdo do post -->
      <div v-else class="post-container relative">
        <PostHeader 
          :post="post"
          :is-liked="isLiked"
          :is-bookmarked="isBookmarked"
          :likes-count="likesCount"
          @toggle-like="toggleLike"
          @toggle-bookmark="toggleBookmark"
        />
        
        <PostContent :post="post" />
        
        <PostActions 
          :is-liked="isLiked"
          :is-bookmarked="isBookmarked"
          :likes-count="likesCount"
          @toggle-like="toggleLike"
          @toggle-bookmark="toggleBookmark"
        />
        
        <CommentsSection 
          :comments="comments"
          v-model:new-comment="newComment"
          @add-comment="addComment"
        />
      </div>
    </div>
  </div>
 
</template>

<style scoped>
/* Container do post com posição relativa para os raios */
.post-container {
  position: relative;
  overflow: hidden;
}

/* Efeitos de gradiente para texto */
.gradient-text {
  background: linear-gradient(to right, #00DC82, #00C4A7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline;
}
</style>

<style>
/* Efeitos de raios (global pois são injetados via JS) */
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
  0% { opacity: 0; width: 0; }
  30% { opacity: 0.5; }
  100% { opacity: 0; width: 100px; }
}
</style>