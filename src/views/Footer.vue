<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Efeito de raios verdes no footer
  const footer = document.querySelector('.footer-ray-effect')
  
  const createFooterRay = () => {
    const ray = document.createElement('div')
    ray.className = 'footer-ray'
    
    // Posição aleatória na parte superior do footer
    const posX = Math.random() * 100
    const angle = -30 + Math.random() * 60 // Ângulo entre -30 e 30 graus
    const duration = 1 + Math.random() * 2 // Duração entre 1-3s
    
    ray.style.setProperty('--x', `${posX}%`)
    ray.style.setProperty('--angle', `${angle}deg`)
    ray.style.setProperty('--duration', `${duration}s`)
    
    footer.appendChild(ray)
    
    // Remove o raio após a animação
    setTimeout(() => {
      ray.remove()
    }, duration * 1000)
  }
  
  // Intervalo maior para os raios no footer (8-12 segundos)
  const animateFooterRays = () => {
    if (Math.random() < 0.3) { // 30% de chance de executar
      createFooterRay()
    }
    setTimeout(animateFooterRays, 8000 + Math.random() * 4000)
  }
  
  // Inicia a animação
  setTimeout(animateFooterRays, 3000)
})
</script>

<template>
  <!-- Footer -->
  <footer class="bg-dark-800 border-t border-dark-700 py-8 mt-12 relative overflow-hidden">
    <!-- Efeito de raios -->
    <div class="footer-ray-effect absolute top-0 left-0 w-full h-full pointer-events-none"></div>
    
    <!-- Brilho sutil -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 rounded-full filter blur-3xl opacity-5"></div>
      <div class="absolute bottom-1/4 right-1/4 w-32 h-32 bg-green-500 rounded-full filter blur-3xl opacity-5"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <a href="#" class="text-2xl font-bold">
            <span class="nuxt-logo-text">NUXT<span class="text-green-400">BLOG</span></span>
          </a>
          <p class="text-gray-400 text-sm mt-1">Compartilhando conhecimento desde 2023</p>
        </div>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Termos</a>
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Privacidade</a>
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Contato</a>
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Sobre</a>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-dark-700 text-center text-gray-500 text-sm">
        © 2023 NUXTBLOG. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<style>
/* Efeito de raios no footer */
.footer-ray {
  position: absolute;
  top: 0;
  left: var(--x);
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, rgba(74, 222, 128, 0), #4ade80, rgba(74, 222, 128, 0));
  transform: rotate(var(--angle));
  transform-origin: left center;
  filter: drop-shadow(0 0 2px rgba(74, 222, 128, 0.3));
  animation: footerRayAnimation var(--duration) ease-out forwards;
  opacity: 0;
}

@keyframes footerRayAnimation {
  0% {
    opacity: 0;
    width: 0;
  }
  30% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    width: 120px;
  }
}

/* Estilo do logo NUXTBLOG */
.nuxt-logo-text {
  background: linear-gradient(to right, #00DC82, #00C4A7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

.nuxt-logo-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #00DC82, #00C4A7);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nuxt-logo-text:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Efeito de brilho sutil no hover dos links */
a:hover {
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.3);
}
</style>