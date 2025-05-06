import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'dashboard',
      component: () => import('dashboard/DashboardView'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('auth/LoginView'),
    },
    {
      path: '/auth-showcase',
      name: 'auth-showcase',
      component: () => import('@/views/AuthShowcaseView.vue'),
    },
  ],
});

// component: async () => {
//   try {
//     const module = await import('auth/LoginView');
//     return module.default;
//   } catch (error) {
//     console.error('Erro ao carregar a view de login:', error);
//   }
// },

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  authStore.checkAuth();

  if (isAuthenticated.value && to.name === 'login') {
    next({ name: 'dashboard' });
  } else if (!isAuthenticated.value && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
