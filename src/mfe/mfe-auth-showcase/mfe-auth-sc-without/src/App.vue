<script lang="ts" setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  window.dispatchEvent(
    new CustomEvent('auth:status', {
      detail: {
        source: 'mfe-auth-sc-without',
        payload: 'Recurso disponível.',
        success: true,
      },
    }),
  )
})
</script>

<template>
  <section class="without-auth">
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
  </section>
</template>
