<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth.ts';

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);

const revokeToken = ref(false);
const actionTokenLabel = ref('Revogar');

const cards = [
  { title: 'MFE 01', subtitle: 'Exibe apenas autenticado' },
  { title: 'MFE 02', subtitle: 'Exibe parcialmente sem autenticação' },
  { title: 'MFE 03', subtitle: 'Precisa de outra autenticação' },
  { title: 'MFE 04', subtitle: 'Exibe sem estar autenticado' },
];

function handleTokenToggle() {
  debugger;
  revokeToken.value = !revokeToken.value;

  if (revokeToken.value) {
    authStore.revokeCookie();
    actionTokenLabel.value = 'Ratificar';
  } else {
    authStore.ratifyCookie();
    actionTokenLabel.value = 'Revogar';
  }
}

onBeforeUnmount(() => {
  authStore.ratifyCookie();
});
</script>

<template>
  <section class="auth-showcase section">
    <div class="auth-showcase-container container">
      <h2 class="title is-4">Authentication Showcase</h2>

      <div class="auth-showcase__desc box">
        <p>
          Esta tela demonstra, de forma prática, como a arquitetura de Microfrontends (MFE) pode ser
          integrada com o Auth0 para implementar autenticação via Single Sign-On (SSO). O objetivo é
          evidenciar o processo de autenticação centralizada, bem como a estratégia adotada para o
          compartilhamento do token de sessão entre os diferentes MFE envolvidos, garantindo coesão
          e continuidade na experiência do usuário em um ambiente distribuído.
        </p>
      </div>

      <div class="auth-showcase__user columns is-multiline">
        <div class="column is-3">
          <div class="box">
            <div class="is-flex is-align-items-center is-gap-2">
              <span class="icon p-5 has-background-dark has-text-light has-radius-rounded">
                <span class="material-icons">person</span>
              </span>
              <div>
                <p class="has-text-weight-semibold">{{ user.name }}</p>
                <p class="is-size-7">{{ user.email }}</p>
              </div>
            </div>
            <p class="is-flex is-align-items-center is-gap-1 mt-3">
              <template v-if="isAuthenticated">
                <span class="icon is-small">
                  <span class="material-icons">check_circle</span>
                </span>
                Autenticado
              </template>
              <template v-else>
                <span class="icon is-small">
                  <span class="material-icons">error</span>
                </span>
                Não autenticado
              </template>
            </p>
            <div class="buttons is-centered mt-3">
              <button class="button is-fullwidth is-light" @click="handleTokenToggle">
                {{ actionTokenLabel }}
              </button>
            </div>
          </div>
        </div>

        <div class="column is-5">
          <div class="notification is-light is-size-7">
            <div class="is-flex is-align-items-center is-justify-content-space-between">
              <code class="is-family-code is-size-7 is-code-ellipsis">
                {{ authStore.readCookie }}
              </code>
              <button class="button is-white is-small ml-2">
                <span class="icon is-small">
                  <span class="material-icons">file_copy</span>
                </span>
              </button>
            </div>
            <div class="has-text-grey mt-2 is-size-7">
              Para fins de demonstração de perda de sessão, o cookie gerado não usa HTTPOnly. Essa
              prática é insegura e não recomendada.
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-multiline mt-5">
        <div v-for="card in cards" :key="card.title" class="column is-3">
          <div class="box has-text-centered">
            <p class="has-text-weight-semibold">{{ card.title }}</p>
            <p class="is-size-7">{{ card.subtitle }}</p>
            <button class="button is-light is-fullwidth mt-4">Abrir</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.box {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.is-code-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%;
}
</style>
