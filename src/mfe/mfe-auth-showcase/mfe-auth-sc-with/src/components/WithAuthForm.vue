<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

const isAuth = ref(false);

onBeforeMount(() => {
  isAuth.value = isAuthenticated();
});

function isAuthenticated() {
  return window.__globalAuth__?.isAuthenticated;
}
</script>

<template>
  <div class="with-auth-form">
    <template v-if="isAuth">
      <div class="field">
        <label class="label">Field 01</label>
        <div class="control">
          <input class="input" placeholder="Field 01" type="text" />
        </div>
      </div>

      <div class="field">
        <label class="label">Field 02</label>
        <div class="control">
          <input class="input" placeholder="Field 02" type="text" />
        </div>
      </div>
    </template>

    <div v-else class="with-auth--unauthenticated has-text-centered py-6">
      <span class="icon is-small">
        <span class="material-icons">warning</span>
      </span>
      <p class="has-text-grey">Não autenticado</p>
    </div>
  </div>
</template>
