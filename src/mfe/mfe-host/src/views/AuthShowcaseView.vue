<script lang="ts" setup>
import {
  defineAsyncComponent,
  type DefineComponent,
  markRaw,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.ts';

import ShowcaseModal from '@/components/ShowcaseModal.vue';

import { useNotify } from '@/composables/useNotify';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const notify = useNotify();

export type TMFEOptions = 'mfe-01' | 'mfe-02' | 'mfe-03' | 'mfe-04';

interface IMFECard {
  id: TMFEOptions;
  title: string;
  subtitle: string;
}

interface IMFEModal {
  title: string;
  description: string;
  component: () => DefineComponent<any, any, any>;
}

const simulatedAuthStatus = ref(true);
const actionTokenLabel = ref('Revogar');
const currentModal = ref<IMFEModal | null>();

const open = ref(false);

const cardList: Array<IMFECard> = [
  { id: 'mfe-01', title: 'MFE 01', subtitle: 'Exibe apenas autenticado' },
  { id: 'mfe-02', title: 'MFE 02', subtitle: 'Exibe parcialmente sem autenticação' },
  { id: 'mfe-03', title: 'MFE 03', subtitle: 'Precisa de outra autenticação' },
  { id: 'mfe-04', title: 'MFE 04', subtitle: 'Exibe sem estar autenticado' },
];

const modalMap: Record<TMFEOptions, IMFEModal> = {
  'mfe-01': {
    title: 'MFE 01 – Autenticação Necessária',
    description:
      'Esse Microfrontend exibe seu conteúdo apenas quando o usuário estiver autenticado no domínio.',
    component: markRaw(defineAsyncComponent(() => import('with-auth/WithAuthForm'))),
  },
  'mfe-02': {
    title: 'MFE 02 – Autenticação Condicional',
    description:
      'Esse Microfrontend exibe seu conteúdo em modo de apenas visualização quando o usuário não está autenticado.',
    component: markRaw(defineAsyncComponent(() => import('half-auth/HalfAuthForm'))),
  },
  'mfe-03': {
    title: 'MFE 03 – Autenticação Fora do Domínio',
    description:
      'Esse Microfrontend exibe seu conteúdo apenas quando o usuário estiver autenticado no domínio. Entretanto, ele está em um domínio diferente do da autenticação atual.',
    component: markRaw(defineAsyncComponent(() => import('@/components/AnotherAuthIframe.vue'))),
  },
  'mfe-04': {
    title: 'MFE 04 – Autenticação não Necessária',
    description:
      'Esse Microfrontend exibe seu conteúdo independente do usuário estar autenticado ou não.',
    component: markRaw(defineAsyncComponent(() => import('without-auth/WithoutAuthForm'))),
  },
};

function handleAuthStatus() {
  simulatedAuthStatus.value = !simulatedAuthStatus.value;

  if (simulatedAuthStatus.value) {
    authStore.simulateAuthenticated();
    actionTokenLabel.value = 'Revogar';
    notify.success('Autenticação foi ratificada.');
  } else {
    authStore.simulateNotAuthenticated();
    actionTokenLabel.value = 'Ratificar';
    notify.open({
      type: 'warning',
      message: 'Autenticação foi revogada.',
    });
  }
}

function handleShowcaseModal(id: TMFEOptions) {
  currentModal.value = modalMap[id];
  open.value = true;
}

function handleCopyCookie() {
  navigator.clipboard.writeText(authStore.readCookie);
  notify.success('Cookie copiado para a área de transferência.');
}

window.addEventListener('auth:status', (event: Event) => {
  const { payload, source, success } = event.detail;
  const message = `${source}: ${payload}`;
  success ? notify.success(message) : notify.error(message);
});

onMounted(() => {
  authStore.simulateAuthenticated();
});

onBeforeUnmount(() => {
  authStore.simulateAuthenticated();
  window.removeEventListener('auth:status', () => void 0);
});
</script>

<template>
  <section v-if="user" class="auth-showcase section">
    <div class="auth-showcase-container container">
      <h2 class="title">Authentication Showcase</h2>
      <div class="auth-showcase__desc box">
        <p class="is-wrapped">
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
              <template v-if="simulatedAuthStatus">
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
              <button class="button is-fullwidth is-light" @click="handleAuthStatus">
                {{ actionTokenLabel }}
              </button>
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="notification is-light is-size-7">
            <div class="is-flex is-align-items-center is-justify-content-space-between">
              <code class="is-family-code is-size-7 is-code-ellipsis">
                {{ authStore.readCookie }}
              </code>
              <button class="button is-white is-small ml-2" @click="handleCopyCookie">
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

      <div class="auth-showcase__cards columns">
        <div
          v-for="card in cardList"
          :key="card.title"
          class="auth-showcase__cards__card column is-auto-fill"
        >
          <div class="box has-text-centered">
            <p class="auth-showcase__cards__card__title is-size-5 has-text-weight-semibold">
              {{ card.title }}
            </p>
            <p class="auth-showcase__cards__card__subtitle is-size-6">{{ card.subtitle }}</p>
            <button
              class="auth-showcase__cards__card__button button is-light is-fullwidth"
              @click="handleShowcaseModal(card.id)"
            >
              Abrir
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <showcase-modal
    v-if="!!currentModal"
    v-model="open"
    :description="currentModal.description"
    :title="currentModal.title"
  >
    <component :is="currentModal.component" />
  </showcase-modal>
</template>

<style lang="scss" scoped>
.auth-showcase {
  padding: 0 24px;

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

  &__cards {
    height: 214px;
    gap: 8px;

    &__card {
      height: 100%;

      .box {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      &__button {
        margin-top: auto;
      }
    }
  }
}
</style>
