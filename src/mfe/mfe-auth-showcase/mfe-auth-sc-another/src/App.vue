<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

const isAuth = ref(false);

onBeforeMount(() => {
  isAuth.value = isAuthenticated();
});

function isAuthenticated() {
  const auth = window.__globalAuth__;

  if (!auth) {
    alert('Não autenticado!');
    return false;
  }

  return auth?.isAuthenticated;
}
</script>

<template>
  <div class="another-auth">
    <div v-if="isAuth" class="another-auth--authenticated">
      <p>Bem-vindo ao Microfrontend que espera outra autenticação.</p>
    </div>
    <div v-else class="another-auth--unauthenticated has-text-centered py-6">
      <span class="icon is-small">
        <span class="material-icons">warning</span>
      </span>
      <p class="has-text-grey">Não autenticado</p>
    </div>
  </div>
</template>
