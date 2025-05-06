<script lang="ts" setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export interface UserMenuProps {
  name: string;
  email: string;
  picture?: string | null;
}

defineProps<UserMenuProps>();

const openMenu = ref(false);
const menuRef = ref(null);

onClickOutside(menuRef, () => {
  openMenu.value = false;
});
</script>

<template>
  <div ref="menuRef" class="user-menu">
    <button class="user-menu__button button" @click="openMenu = !openMenu">
      <img v-if="picture" :src="picture" alt="user picture" class="user-menu__button__picture" />
      <span v-else class="icon">
        <i class="fas fa-user"></i>
      </span>
    </button>

    <div v-if="openMenu" class="user-menu__dropdown-card card">
      <div class="user-menu__card__content card-content">
        <p class="title is-6 mb-1">{{ name }}</p>
        <p class="subtitle is-7 has-text-grey">{{ email }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-menu {
  position: relative;

  &__button {
    padding: 0;
    border-radius: 50%;
    border: none;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #fff;

    &__picture {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  &__dropdown-card {
    position: absolute;
    right: 0;
    top: 64px;
    min-width: 220px;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .icon {
    pointer-events: none;
  }
}
</style>
