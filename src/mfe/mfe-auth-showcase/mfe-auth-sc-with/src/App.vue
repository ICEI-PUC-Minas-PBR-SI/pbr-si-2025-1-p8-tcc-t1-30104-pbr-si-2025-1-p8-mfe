<script lang="ts" setup>
import { ref } from 'vue';

import WithAuthModal from '@/components/WithAuthModal.vue';

const open = ref(false);
</script>

<template>
  <div>
    <button class="button is-primary" @click="open = true">Abrir</button>
    <with-auth-modal v-model="open" />
  </div>
</template>
