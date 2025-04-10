import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '@/views/Register.vue';
import Forgot from '@/views/Forgot.vue';
import Login from '@/views/Login.vue';
import VerifyEmail from '@/views/VerifyEmail.vue';

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: Home,
    meta: {
      public: true,
  },
  },
  { 
    path: '/register', 
    name: 'register', 
    component: Register,
    meta: {
      public: true,
  },
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login ,
    meta: {
      public: true,
  },

  }, 
  {
    path: '/forgot', 
    name: 'Forgot', 
    component: Forgot ,
    meta: {
      public: true,
  },
  }, 
  {
    path: '/verify-code', 
    name: 'VerifyEmail', 
    component: VerifyEmail ,
    meta: {
      public: true,
  },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de navegação global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Se a rota requer autenticação e não tem token, redireciona para login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'login' });
    return;
  }
  
  // Se já está autenticado e tenta acessar rotas públicas (login/register), redireciona
  if (to.matched.some(record => record.meta.public) && token && 
      (to.name === 'login' || to.name === 'register' || to.name === 'forgot')) {
    next({ name: 'dashboard' }); // Ou para a rota que você preferir
    return;
  }
  
  next();
});

export default router;
