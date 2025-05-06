<script lang="ts" setup>
import { ref } from 'vue';

import HalfAuthModal from '@/components/HalfAuthModal.vue';

const open = ref(false);
</script>

<template>
  <button class="button is-primary" @click="open = true">Abrir</button>
  <half-auth-modal v-model="open" />
</template>
