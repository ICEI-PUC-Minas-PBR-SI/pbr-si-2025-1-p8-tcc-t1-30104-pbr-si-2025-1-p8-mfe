<script lang="ts" setup>
import { ref } from 'vue';

const isAuthenticated = ref(false);

window.addEventListener('internal-auth:login', () => {
  isAuthenticated.value = true;
});

window.addEventListener('internal-auth:logout', () => {
  isAuthenticated.value = false;
});
</script>

<template>
  <div class="another-auth">
    <div v-if="isAuthenticated" class="another-auth--authenticated box">
      <p>Bem-vindo ao Microfrontend que espera outra autenticação.</p>
    </div>
    <div v-else class="another-auth--not-authenticated box has-text-centered">
      <span class="icon is-small">
        <span class="material-icons">warning</span>
      </span>
      <p class="has-text-grey">Não autenticado</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.another-auth {
  .box {
    box-shadow: none;
    border: 1px solid #404654;
  }
}
</style>
