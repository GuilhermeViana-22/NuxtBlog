<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Efeito de raios verdes intermitentes
  const box = document.querySelector('.about-box')
  let isAnimating = false
  
  const animateRays = () => {
    if (isAnimating) return
    isAnimating = true
    
    // Cria 3-5 raios verdes aleatórios
    const rayCount = 3 + Math.floor(Math.random() * 3)
    
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement('div')
      ray.className = 'green-ray'
      
      // Posição aleatória
      const posX = Math.random() * 100
      const posY = Math.random() * 100
      const angle = Math.random() * 360
      const duration = 0.5 + Math.random() * 1
      
      ray.style.setProperty('--x', `${posX}%`)
      ray.style.setProperty('--y', `${posY}%`)
      ray.style.setProperty('--angle', `${angle}deg`)
      ray.style.setProperty('--duration', `${duration}s`)
      
      box.appendChild(ray)
      
      // Remove o raio após a animação
      setTimeout(() => {
        ray.remove()
      }, duration * 1000)
    }
    
    setTimeout(() => {
      isAnimating = false
    }, 300)
  }
  
  // Animação inicial
  setTimeout(animateRays, 500)
  
  // Animação periódica
  const interval = setInterval(animateRays, 3000)
  
  // Limpeza
  return () => clearInterval(interval)
})
</script>

<template>
  <!-- Sobre o Blog com efeitos de raios -->
  <div class="about-box relative bg-gray-800 rounded-lg p-6 overflow-hidden border border-green-400/10">
    <!-- Raios serão injetados aqui via JS -->
    
    <h3 class="text-xl font-bold mb-4 gradient-text relative z-10">
      Sobre o NuxtBLog      <br>
      <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-transparent"></span>
    </h3>

    <p class="text-gray-300 relative z-10">
      Um lugar para desenvolvedores compartilharem conhecimento, experiências e se conectarem com outros profissionais.
    </p>
    
    <!-- Efeito de brilho sutil -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-10 -left-10 w-20 h-20 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
      <div class="absolute -bottom-10 -right-10 w-20 h-20 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
    </div>
  </div>
</template>

<style>
.gradient-text {
  background: linear-gradient(90deg, #ffffff, #4ade80);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline;
}

.green-ray {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, rgba(74, 222, 128, 0), #4ade80, rgba(74, 222, 128, 0));
  transform: rotate(var(--angle));
  transform-origin: left center;
  filter: drop-shadow(0 0 5px #4ade80);
  animation: rayAnimation var(--duration) ease-out forwards;
  opacity: 0;
}

@keyframes rayAnimation {
  0% {
    opacity: 0;
    width: 0;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    width: 100px;
  }
}

.about-box:hover {
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.2);
  transition: box-shadow 0.3s ease;
}
</style>