<script lang="ts" setup>
import { ref } from 'vue';

const model = defineModel<boolean>({ default: false });

const emit = defineEmits(['close']);

const isAuth = true;

const fields = ref({
  fieldOne: 'Valor do campo 01',
  fieldTwo: 'Valor do campo 02',
});

function handleClose() {
  model.value = false;
  emit('close');
}
</script>

<template>
  <div v-if="model" class="half-auth-modal modal is-active">
    <div class="modal-background" @click="handleClose"></div>

    <div class="half-auth-modal__card modal-card">
      <header class="half-auth-modal__card__header modal-card-head">
        <p class="modal-card-title">MFE Autenticação Condicional</p>
        <button aria-label="close" class="delete" @click="handleClose"></button>
      </header>

      <section class="half-auth-modal__card__body modal-card-body">
        <div class="notification is-light has-text-centered">
          Esse Microfrontend exibe seu conteúdo em modo de apenas visualização quando o usuário não
          está autenticado.
        </div>

        <div class="half-auth-modal__card__body__content box">
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
      </section>

      <footer class="half-auth-modal__card__footer modal-card-foot is-justify-content-center">
        <button class="button is-dark px-6" @click="handleClose">Fechar</button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.half-auth-modal {
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
