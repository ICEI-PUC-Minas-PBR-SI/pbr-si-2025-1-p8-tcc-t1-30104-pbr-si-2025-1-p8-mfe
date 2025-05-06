<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LogoutButton from 'auth/LogoutButton';

const router = useRouter();
const route = useRoute();

const items = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '',
  },
  {
    id: 'auth-showcase',
    label: 'Authentication',
    icon: '',
  },
];

const activeItem = ref('');

function handleClick(item: string) {
  activeItem.value = item;
  router.push({ name: item });
}

onBeforeMount(() => {
  activeItem.value = (route.name as string) || 'dashboard';
  router.push({ name: 'dashboard' });
});
</script>

<template>
  <aside class="left-menu">
    <header class="left-menu__header" @click="router.push({ name: 'dashboard' })">
      <div class="left-menu__header__title">MFE</div>
      <div class="left-menu__header__subtitle">Showcase</div>
    </header>

    <main class="left-menu__main">
      <div class="left-menu__main__items">
        <template v-for="item in items" :key="`${item.id}`">
          <div
            :data-active="activeItem === item.id ? 'true' : null"
            class="left-menu__main__items__item"
            @click="handleClick(item.id)"
          >
            <span class="material-icons left-menu__main__items__item__icon">person</span>
            {{ item.label }}
          </div>
        </template>
      </div>
    </main>

    <footer class="left-menu__footer">
      <logout-button />
    </footer>
  </aside>
</template>

<style lang="scss" scoped>
.left-menu {
  position: fixed;
  width: 250px;
  min-height: 100vh;
  background: rgba(#404654, 0.02);
  box-shadow: 2px 0 6px rgba(#404654, 0.05);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 10;

  &__header {
    text-align: center;
    text-transform: uppercase;
    margin: 32px 8px 0 8px;
    cursor: pointer;

    &__title {
      font-size: 2rem;
      font-weight: bold;
    }

    &__subtitle {
      font-size: 1.5rem;
    }
  }

  &__main {
    &__items {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      &__item,
      &__subitem {
        border-radius: 32px 0 0 32px;
        margin-left: 24px;
        padding: 8px 0 8px 8px;
        font-size: 1rem;
        color: #404654;
        letter-spacing: 1.5px;
        cursor: pointer;
        display: flex;
        align-items: center;

        &__icon {
          font-size: 1rem;
          margin: 0 4px;
        }

        &[data-active='true'] {
          background-color: #404654;
          color: #fff;
        }

        &:not([data-active='true']):hover {
          background-color: rgba(#404654, 0.1);
        }
      }

      &__subitem {
        margin-left: 40px;
      }
    }
  }

  &__footer {
    margin-top: auto;
    padding: 32px;
  }
}
</style>
