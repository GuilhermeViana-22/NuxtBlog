<script setup>
defineProps({
  comments: Array
})

const emit = defineEmits(['update:new-comment', 'add-comment'])

const newComment = defineModel('newComment')
</script>

<template>
  <div class="border-t border-gray-700 pt-8">
    <h3 class="text-xl font-bold mb-6 gradient-text flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      Comentários
      <span class="text-sm text-gray-400 ml-2">{{ comments.length }}</span>
    </h3>
    
    <div class="mb-8 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <textarea
        v-model="newComment"
        placeholder="Adicione um comentário..."
        class="w-full bg-gray-700/50 border border-gray-600 rounded-md px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
        rows="3"
      ></textarea>
      <div class="flex justify-end">
        <button
          @click="emit('add-comment')"
          :disabled="!newComment.trim()"
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comentar
        </button>
      </div>
    </div>
    
    <div class="space-y-6">
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
      >
        <div class="flex justify-between items-start mb-2">
          <div class="font-medium text-green-400">{{ comment.author }}</div>
          <div class="text-xs text-gray-500">{{ comment.date }}</div>
        </div>
        <p class="text-gray-300">{{ comment.content }}</p>
        
        <div class="flex justify-end space-x-4 mt-3 text-sm">
          <button class="text-gray-400 hover:text-green-400 transition-colors">Responder</button>
          <button class="text-gray-400 hover:text-green-400 transition-colors">Curtir</button>
        </div>
      </div>
      
      <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
        Nenhum comentário ainda. Seja o primeiro a comentar!
      </div>
    </div>
  </div>
</template>