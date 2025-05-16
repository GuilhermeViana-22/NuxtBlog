<script setup>
defineProps({
  isLiked: Boolean,
  isBookmarked: Boolean,
  likesCount: Number
})

const emit = defineEmits(['toggle-like', 'toggle-bookmark'])
</script>

<template>
  <div class="flex justify-center space-x-6 mb-12">
    <button 
      @click="emit('toggle-like')"
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
      @click="emit('toggle-bookmark')"
      class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
      :class="isBookmarked ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span>{{ isBookmarked ? 'Salvo!' : 'Salvar' }}</span>
    </button>
  </div>
</template>