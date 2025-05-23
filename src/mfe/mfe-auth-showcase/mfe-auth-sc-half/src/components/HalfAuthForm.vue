<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

const fields = ref({
  fieldOne: 'Valor do campo 01',
  fieldTwo: 'Valor do campo 02',
});

const isAuth = ref(false);

onBeforeMount(() => {
  isAuth.value = isAuthenticated();
});

function isAuthenticated() {
  const auth = window.__globalAuth__;

  window.dispatchEvent(
    new CustomEvent('auth:status', {
      detail: {
        source: 'mfe-auth-sc-half',
        payload: auth.isAuthenticated ? 'Autenticado.' : 'Não autenticado.',
        success: auth.isAuthenticated,
      },
    }),
  );

  return auth.isAuthenticated;
}
</script>

<template>
  <div class="half-auth-form">
    <div class="field">
      <label class="label">Field 01</label>
      <div class="control">
        <input
          v-model="fields.fieldOne"
          :disabled="!isAuth"
          class="input"
          placeholder="Field 01"
          type="text"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Field 02</label>
      <div class="control">
        <input
          v-model="fields.fieldTwo"
          :disabled="!isAuth"
          class="input"
          placeholder="Field 02"
          type="text"
        />
      </div>
    </div>
  </div>
</template>
