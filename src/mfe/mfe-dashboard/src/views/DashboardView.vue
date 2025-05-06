<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

import { formatDate } from '@/utils/date.ts';

import type { IUser } from '@/types/User.ts';

import UserMenu from '@/components/UserMenu.vue';
import InfoCard from '@/components/InfoCard.vue';

const userInfo = ref<IUser | null>(null);
const infoCardList = ref<Array<{ label: string; value: string | number }>>([]);

function fillInfoCardList() {
  if (userInfo.value) {
    const { lastLogin, loginsCount, emailVerified, createdAt } = userInfo.value;
    const lastLoginDate = new Date(lastLogin);
    const registerDate = new Date(createdAt);

    infoCardList.value = [
      { label: 'Último login', value: formatDate(lastLoginDate) },
      {
        label: 'Total de logins',
        value: loginsCount,
      },
      {
        label: 'Status do e-mail',
        value: emailVerified ? 'Verificado' : 'Não verificado',
      },
      {
        label: 'Registro',
        value: formatDate(registerDate),
      },
    ];
  }
}

function getAuthSnapshot() {
  if (window.__globalAuth__?.isAuthenticated) return window.__globalAuth__;

  const stored = sessionStorage.getItem('auth:user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  return null;
}

onBeforeMount(() => {
  const auth = getAuthSnapshot();

  if (auth?.isAuthenticated) {
    userInfo.value = auth.user;
    fillInfoCardList();
  }
});
</script>

<template>
  <div v-if="userInfo" class="dashboard-container">
    <header class="dashboard-container__header">
      <h3 class="is-3">Olá, {{ userInfo.name }}</h3>
      <UserMenu :email="userInfo.email" :name="userInfo.name" :picture="userInfo.picture" />
    </header>

    <main class="dashboard-container__content">
      <div class="dashboard-container__content__user-info">
        <InfoCard
          v-for="(infoCard, index) in infoCardList"
          :key="`info-card-${index}`"
          :subtitle="infoCard.value"
          :title="infoCard.label"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    margin-top: 32px;

    &__user-info {
      display: flex;
      gap: 24px;
    }
  }
}
</style>
