import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('../pages/tools/toolsIndex.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;