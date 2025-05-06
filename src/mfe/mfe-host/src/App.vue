<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';

import { RouterView, useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.ts';

import type { IUser } from '@/types/User.ts';

import LeftMenu from '@/components/LeftMenu.vue';

const router = useRouter();

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

window.addEventListener('auth:user', (event: Event) => {
  const user = event.detail.payload as IUser;
  authStore.login(user);
  router.push({ name: 'dashboard' });
});

window.addEventListener('auth:logout', () => {
  authStore.logout();
  router.push({ name: 'login' });
});

onBeforeUnmount(() => {
  window.removeEventListener('auth:login', () => void 0);
  window.removeEventListener('auth:logout', () => void 0);
});
</script>

<template>
  <div v-if="isAuthenticated" class="layout">
    <left-menu class="layout__aside-menu" />
    <main class="layout__content">
      <router-view />
    </main>
  </div>
  <router-view v-else />
</template>

<style lang="scss" scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  &__content {
    margin-left: 250px;
    padding: 20px;
    flex: 1;
  }
}
</style>
