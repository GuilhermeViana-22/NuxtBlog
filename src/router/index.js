// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

// Importações de componentes
const Home = () => import('@/views/Home.vue')
const Register = () => import('@/views/Register.vue')
const Login = () => import('@/views/Login.vue')
const Forgot = () => import('@/views/Forgot.vue')
const VerifyEmail = () => import('@/views/VerifyEmail.vue')
const Perfil = () => import('@/views/Perfil.vue')
const Post = () => import('@/components/post/Post.vue')
const NovoPost = () => import('@/views/NovoPost.vue')

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: Home,
    meta: { public: true }
  },
  { 
    path: '/register', 
    name: 'register', 
    component: Register,
    meta: { public: true }
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login,
    meta: { public: true }
  },
  {
    path: '/forgot', 
    name: 'forgot', 
    component: Forgot,
    meta: { public: true }
  },
  {
    path: '/verify-email', 
    name: 'verify-email', 
    component: VerifyEmail,
    meta: { public: true }
  },
  {
    path: '/perfil', 
    name: 'perfil', 
    component: Perfil,
    meta: { requiresAuth: true }
  },
  {
    path: '/novo-post',
    name: 'novo-post',
    component: NovoPost,
    meta: { public: true }
  },

    {
    path: '/post/:id',
    name: 'post',
    component: Post,
    meta: { public: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guarda de navegação global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Se a rota requer autenticação e o usuário não está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  // Se o usuário está autenticado e tenta acessar rotas públicas (login/register)
  if (to.meta.public && authStore.isAuthenticated && ['login', 'register', 'forgot'].includes(to.name)) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router