import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import { storeToRefs } from 'pinia';

import DashboardView from 'dashboard/DashboardView';
import LoginView from 'auth/LoginView';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth-showcase',
      name: 'auth-showcase',
      component: () => import('@/views/AuthShowcaseView.vue'),
    },
  ],
});

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
