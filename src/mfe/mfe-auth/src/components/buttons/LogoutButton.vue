<script lang="ts" setup>
import logoutService from '@/services/LogoutService.ts';

function handleLogout() {
  logoutService();
}
</script>

<template>
  <p class="control has-icons-left has-icons-right">
    <input class="button is-dark logout-btn" type="button" value="Logout" @click="handleLogout" />
    <span class="icon is-small is-left">
      <span class="material-icons">logout</span>
    </span>
  </p>
</template>

<style lang="scss" scoped>
.logout-btn {
  width: 100%;
}
</style>
