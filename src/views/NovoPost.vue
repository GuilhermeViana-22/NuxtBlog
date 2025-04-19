<template>
    <div class="min-h-screen bg-gray-900">
      <Navbar />
      
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-extrabold text-white">
              Criar Novo Post
            </h2>
            <p class="mt-2 text-sm text-gray-300">
              Compartilhe seu conhecimento com a comunidade
            </p>
          </div>
  
          <!-- Form Container -->
          <div class="bg-gray-800 py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-700">
            <form class="space-y-6" @submit.prevent="submitPost">
              <!-- Title Field -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-300">
                  Título
                </label>
                <div class="mt-1">
                  <input
                    id="title"
                    v-model="post.title"
                    type="text"
                    required
                    class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Digite o título do post"
                  />
                </div>
              </div>
  
              <!-- Subtitle Field -->
              <div>
                <label for="subtitle" class="block text-sm font-medium text-gray-300">
                  Subtítulo
                </label>
                <div class="mt-1">
                  <input
                    id="subtitle"
                    v-model="post.subtitle"
                    type="text"
                    class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Digite o subtítulo do post"
                  />
                </div>
              </div>
  
              <!-- Image URL Field -->
              <div>
                <label for="image_url" class="block text-sm font-medium text-gray-300">
                  URL da Imagem
                </label>
                <div class="mt-1">
                  <input
                    id="image_url"
                    v-model="post.image_url"
                    type="text"
                    class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Cole a URL da imagem principal"
                  />
                </div>
                <div v-if="post.image_url" class="mt-2">
                  <img :src="post.image_url" alt="Preview da imagem" class="max-h-60 rounded-md border border-gray-600" />
                </div>
              </div>
  
              <!-- Content Editor -->
              <div>
                <label class="block text-sm font-medium text-gray-300">
                  Conteúdo do Post
                </label>
                <div class="mt-1">
                  <div ref="quillEditor" class="quill-editor bg-gray-700 text-white rounded-md border border-gray-600"></div>
                </div>
              </div>
  
              <!-- Footer Field -->
              <div>
                <label for="footer" class="block text-sm font-medium text-gray-300">
                  Rodapé
                </label>
                <div class="mt-1">
                  <input
                    id="footer"
                    v-model="post.footer"
                    type="text"
                    class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Texto do rodapé do post"
                  />
                </div>
              </div>
  
              <!-- Links Field -->
              <div>
                <label for="links" class="block text-sm font-medium text-gray-300">
                  Links Relacionados (separados por vírgula)
                </label>
                <div class="mt-1">
                  <input
                    id="links"
                    v-model="linksInput"
                    type="text"
                    class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="http://exemplo1.com, http://exemplo2.com"
                    @change="updateLinksArray"
                  />
                </div>
              </div>
  
              <!-- Category and Type -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Category Field -->
                <div>
                  <label for="category_id" class="block text-sm font-medium text-gray-300">
                    Categoria
                  </label>
                  <div class="mt-1">
                    <select 
                      id="category_id" 
                      v-model="post.category_id" 
                      class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                    >
                      <option value="456">Tecnologia</option>
                      <option value="457">Educação</option>
                      <option value="458">Saúde</option>
                    </select>
                  </div>
                </div>
  
                <!-- Type Field -->
                <div>
                  <label for="type_id" class="block text-sm font-medium text-gray-300">
                    Tipo
                  </label>
                  <div class="mt-1">
                    <select 
                      id="type_id" 
                      v-model="post.type_id" 
                      class="bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                    >
                      <option value="789">Artigo</option>
                      <option value="790">Notícia</option>
                      <option value="791">Opinião</option>
                    </select>
                  </div>
                </div>
              </div>
  
              <!-- Tags Field -->
              <div>
                <label class="block text-sm font-medium text-gray-300">
                  Tags/Tecnologias
                </label>
                <div class="mt-1 relative">
                  <div 
                    class="flex flex-wrap gap-2 bg-gray-700 w-full px-4 py-3 rounded-md border border-gray-600 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent min-h-[46px]"
                    @click="focusTagsInput"
                  >
                    <!-- Tags selecionadas -->
                    <span 
                      v-for="tag in selectedTags" 
                      :key="tag.id"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white"
                    >
                      {{ getTagEmoji(tag.name) }} {{ tag.name }}
                      <button 
                        type="button" 
                        class="ml-1.5 inline-flex text-white hover:text-gray-200 focus:outline-none"
                        @click.stop="removeTag(tag)"
                      >
                        &times;
                      </button>
                    </span>
                    
                    <!-- Input para buscar tags -->
                    <input
                      ref="tagsInput"
                      v-model="tagSearch"
                      type="text"
                      class="flex-grow bg-transparent outline-none text-white placeholder-gray-400 min-w-[100px]"
                      placeholder="Buscar tecnologias..."
                      @input="searchTags"
                      @keydown.enter.prevent="addFirstMatchingTag"
                      @keydown.backspace="handleBackspace"
                    />
                  </div>
                  
                  <!-- Dropdown de sugestões -->
                  <div 
                    v-if="tagSuggestions.length > 0 && tagSearch" 
                    class="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg rounded-md border border-gray-600 max-h-60 overflow-auto"
                  >
                    <ul class="py-1">
                      <li 
                        v-for="tag in tagSuggestions" 
                        :key="tag.id"
                        class="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer flex items-center"
                        @click="addTag(tag)"
                      >
                        <span class="mr-2">{{ getTagEmoji(tag.name) }}</span>
                        {{ tag.name }}
                        <span class="ml-auto text-gray-400 text-xs">#{{ tag.id }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
  
              <!-- Comments Checkbox -->
              <div>
                <div class="flex items-center">
                  <input
                    id="can_be_commented"
                    v-model="post.can_be_commented"
                    type="checkbox"
                    class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label for="can_be_commented" class="ml-2 block text-sm text-gray-300">
                    Permitir comentários
                  </label>
                </div>
              </div>
  
              <!-- Submit Buttons -->
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">Publicar Post</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Quill from 'quill'
  import 'quill/dist/quill.snow.css'
  import axios from 'axios'
  import Navbar from '@/components/Navbar.vue'
  
  export default {
    name: 'NovoPost',
    components: {
      Navbar
    },
    data() {
      return {
        post: {
          title: '',
          subtitle: '',
          body: '',
          footer: '',
          links: [],
          tags_id: [],
          image_url: '',
          user_id: 1,
          category_id: 456,
          type_id: 789,
          can_be_commented: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        quill: null,
        linksInput: '',
        isSubmitting: false,
        allTags: [],          // Todas as tags disponíveis
        selectedTags: [],     // Tags selecionadas
        tagSearch: '',        // Termo de busca
        tagSuggestions: [],   // Sugestões baseadas na busca
        lastBackspace: false  // Para controle do backspace
      }
    },
    async created() {
      await this.fetchAllTags()
    },
    mounted() {
      this.initializeQuill()
    },
    beforeDestroy() {
      if (this.quill) {
        this.quill.off('text-change')
      }
    },
    methods: {
      initializeQuill() {
        this.quill = new Quill(this.$refs.quillEditor, {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          placeholder: 'Escreva o conteúdo do seu post aqui...'
        })
        
        // Customize Quill for dark mode
        const snowTheme = this.quill.theme
        snowTheme.quill.root.style.backgroundColor = '#374151' // bg-gray-700
        snowTheme.quill.root.style.color = '#f3f4f6' // text-gray-100
        
        this.quill.on('text-change', () => {
          this.post.body = this.quill.root.innerHTML
        })
      },
      
      async fetchAllTags() {
        try {
          const response = await axios.get('http://127.0.0.1:8001/api/tags')
          this.allTags = response.data.data
        } catch (error) {
          console.error('Erro ao buscar tags:', error)
          this.$toast.error('Não foi possível carregar as tags', {
            position: 'top-right',
            duration: 3000
          })
        }
      },
      
      searchTags() {
        if (!this.tagSearch) {
          this.tagSuggestions = []
          return
        }
        
        const searchTerm = this.tagSearch.toLowerCase()
        this.tagSuggestions = this.allTags.filter(tag => 
          !this.selectedTags.some(selected => selected.id === tag.id) &&
          (tag.name.toLowerCase().includes(searchTerm) || 
           tag.slug.toLowerCase().includes(searchTerm))
        ).slice(0, 5) // Limita a 5 sugestões
      },
      
      addTag(tag) {
        if (!this.selectedTags.some(t => t.id === tag.id)) {
          this.selectedTags.push(tag)
          this.post.tags_id = this.selectedTags.map(t => t.id)
          this.tagSearch = ''
          this.tagSuggestions = []
        }
      },
      
      addFirstMatchingTag() {
        if (this.tagSuggestions.length > 0) {
          this.addTag(this.tagSuggestions[0])
        }
      },
      
      removeTag(tag) {
        this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id)
        this.post.tags_id = this.selectedTags.map(t => t.id)
      },
      
      focusTagsInput() {
        this.$refs.tagsInput.focus()
      },
      
      handleBackspace() {
        if (this.tagSearch === '' && this.selectedTags.length > 0) {
          if (this.lastBackspace) {
            this.removeTag(this.selectedTags[this.selectedTags.length - 1])
          } else {
            this.lastBackspace = true
            setTimeout(() => { this.lastBackspace = false }, 300)
          }
        }
      },
      
      getTagEmoji(tagName) {
        const emojiMap = {
          'Elixir': '🧪',
          'Go': '🐹',
          'Python': '🐍',
          'JavaScript': '📜',
          'Vue': '🖖',
          'React': '⚛️',
          'PHP': '🐘',
          'Ruby': '💎',
          'Java': '☕',
          'C++': '➕',
          'Rust': '🦀',
          'Swift': '🐦',
          'Kotlin': '🅱️',
          'TypeScript': '✏️',
          'Dart': '🎯',
          'Pascal': '🧮'
        }
        
        return emojiMap[tagName] || '🏷️'
      },
      
      updateLinksArray() {
        this.post.links = this.linksInput.split(',').map(link => link.trim()).filter(link => link)
      },
      
      async submitPost() {
        // Atualiza as datas
        this.post.updated_at = new Date().toISOString()
        
        // Validação básica
        if (!this.post.title || !this.post.body) {
          this.$toast.error('Título e conteúdo são obrigatórios!', {
            position: 'top-right',
            duration: 3000
          })
          return
        }
        
        this.isSubmitting = true
        
        try {
          // Simulação de chamada API
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          this.$toast.success('Post criado com sucesso!', {
            position: 'top-right',
            duration: 3000
          })
          
          this.resetForm()
          
        } catch (error) {
          this.$toast.error('Erro ao criar o post: ' + error.message, {
            position: 'top-right',
            duration: 5000
          })
        } finally {
          this.isSubmitting = false
        }
      },
      
      resetForm() {
        this.post = {
          title: '',
          subtitle: '',
          body: '',
          footer: '',
          links: [],
          tags_id: [],
          image_url: '',
          user_id: 1,
          category_id: 456,
          type_id: 789,
          can_be_commented: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        this.linksInput = ''
        this.selectedTags = []
        this.tagSearch = ''
        this.tagSuggestions = []
        if (this.quill) {
          this.quill.root.innerHTML = ''
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilo personalizado para o editor Quill no dark mode */
  .quill-editor {
    height: 400px;
  }
  
  .quill-editor ::v-deep .ql-toolbar {
    background-color: #4b5563; /* bg-gray-600 */
    border-color: #4b5563 !important;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
  }
  
  .quill-editor ::v-deep .ql-container {
    border-color: #4b5563 !important;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
  
  .quill-editor ::v-deep .ql-editor {
    min-height: 350px;
  }
  
  /* Ajustes para dark mode nos elementos do Quill */
  .quill-editor ::v-deep .ql-snow .ql-stroke {
    stroke: #d1d5db; /* text-gray-300 */
  }
  
  .quill-editor ::v-deep .ql-snow .ql-fill {
    fill: #d1d5db; /* text-gray-300 */
  }
  
  .quill-editor ::v-deep .ql-snow .ql-picker {
    color: #d1d5db; /* text-gray-300 */
  }
  
  .quill-editor ::v-deep .ql-snow .ql-picker-options {
    background-color: #374151; /* bg-gray-700 */
    border-color: #4b5563 !important; /* border-gray-600 */
  }
  
  /* Animação do spinner */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>