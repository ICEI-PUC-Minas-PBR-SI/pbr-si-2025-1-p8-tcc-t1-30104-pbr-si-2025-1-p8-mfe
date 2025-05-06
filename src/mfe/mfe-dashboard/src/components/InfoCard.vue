<script lang="ts" setup>
export interface InfoCardProps {
  title: string;
  subtitle: string | number;
}

defineProps<InfoCardProps>();
</script>

<template>
  <div class="info-card">
    <div class="info-card__content box">
      <p class="info-card__content__title">{{ title }}</p>
      <p class="info-card__content__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-card {
  width: 100%;

  &__content {
    padding: 16px;

    &__title {
      font-size: 0.875rem;
      margin-bottom: 24px;
    }

    &__subtitle {
      font-size: 1.25rem;
    }
  }
}
</style>
