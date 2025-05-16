<script setup>
defineProps({
  post: Object,
  isLiked: Boolean,
  isBookmarked: Boolean,
  likesCount: Number
})

const emit = defineEmits(['toggle-like', 'toggle-bookmark'])
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-400">
        <span>4 min de leitura</span>
        <span>•</span>
        <span>{{ post.created_at }}</span>
      </div>
      
      <div class="flex space-x-2">
        <button 
          @click="emit('toggle-like')"
          class="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
          :class="{ 'text-red-500': isLiked }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{{ likesCount }}</span>
        </button>
        
        <button 
          @click="emit('toggle-bookmark')"
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
       2
      </span>
    </div>
    
    <div v-if="post.image_url" class="mb-8 rounded-lg overflow-hidden relative h-64 md:h-80">
      <img 
        :src="post.image_url" 
        :alt="post.title" 
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
    </div>
  </div>
</template>