<script lang="ts" setup>
const model = defineModel<boolean>({ default: false });

const emit = defineEmits(['close']);

const isAuth = true;

function handleClose() {
  model.value = false;
  emit('close');
}
</script>

<template>
  <div v-if="model" class="with-auth-modal modal is-active">
    <div class="modal-background" @click="handleClose"></div>

    <div class="with-auth-modal__card modal-card">
      <header class="with-auth-modal__card__header modal-card-head">
        <p class="modal-card-title">MFE Autenticação Necessária</p>
        <button aria-label="close" class="delete" @click="handleClose"></button>
      </header>

      <section class="with-auth-modal__card__body modal-card-body">
        <div class="notification is-light has-text-centered">
          Esse Microfrontend exibe seu conteúdo apenas quando o usuário estiver autenticado no
          domínio.
        </div>

        <div class="with-auth-modal__card__body__content box">
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

          <div v-else class="has-text-centered py-6">
            <span class="icon is-small">
              <span class="material-icons">warning</span>
            </span>
            <p class="has-text-grey">Não autenticado</p>
          </div>
        </div>
      </section>

      <footer class="with-auth-modal__card__footer modal-card-foot is-justify-content-center">
        <button class="button is-dark px-6" @click="handleClose">Fechar</button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.with-auth-modal {
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
