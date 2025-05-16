<script setup>
defineProps({
  post: Object
})
</script>

<template>
  <div class="prose prose-invert max-w-none mb-12">
    <div v-html="post.body"></div>
  </div>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .prose {
    font-size: 0.95rem;
  }
}
</style>