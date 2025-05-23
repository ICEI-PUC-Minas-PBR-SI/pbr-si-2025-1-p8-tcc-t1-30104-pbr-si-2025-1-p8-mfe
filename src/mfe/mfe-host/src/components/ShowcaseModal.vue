<script setup lang="ts">

defineProps<{
  title: string;
  description: string;
}>()

const model = defineModel<boolean>({ default: false });

const emit = defineEmits(['close']);

function handleClose() {
  model.value = false;
  emit('close');
}
</script>

<template>
  <div v-if="model" class="showcase-modal modal is-active">
    <div class="modal-background" @click="handleClose"></div>

    <div class="showcase-modal__card modal-card">
      <header class="showcase-modal__card__header modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button aria-label="close" class="delete" @click="handleClose"></button>
      </header>

      <section class="showcase-modal__card__body modal-card-body">
        <div class="notification is-light has-text-centered">
          {{ description }}
        </div>

        <div class="showcase-modal__card__body__content box">
          <slot />
        </div>
      </section>

      <footer class="showcase-modal__card__footer modal-card-foot is-justify-content-center">
        <button class="button is-dark px-6" @click="handleClose">Fechar</button>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.showcase-modal {
  &__card {
    &__footer {
      background-color: #fff;
      padding: 16px;
    }
  }

  .box {
    box-shadow: none;
    border: 1px solid #404654;
  }
}
</style>
