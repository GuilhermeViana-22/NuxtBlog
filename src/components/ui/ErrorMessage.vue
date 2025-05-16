<script setup>
defineProps({
  message: String
})
</script>

<template>
  <div class="text-center py-20 text-red-400">
    {{ message }}
  </div>
</template>