<script lang="ts" setup>
import { provide, ref } from 'vue';

import loginService from '@/services/LoginService.ts';
import registerService from '@/services/RegisterService.ts';
import fetchUserInfo from '@/services/UserService.ts';

import type { TLoginHandler } from '@/types/Login.ts';
import type { TRegisterHandler } from '@/types/Register.ts';

import LoginForm from '@/components/forms/LoginForm.vue';
import RegisterForm from '@/components/forms/RegisterForm.vue';

const isLogin = ref(true);
const cardTitle = ref('Login');
const buttonLabel = ref('Signup');

function toggleForm() {
  isLogin.value = !isLogin.value;
  cardTitle.value = isLogin.value ? 'Login' : 'Signup';
  buttonLabel.value = isLogin.value ? 'Signup' : 'Login';
}

function loginHandler(email?: string, password?: string) {
  if (email && password) {
    loginService({ email, password }).then(() => {
      fetchUserInfo();
    });
  } else {
    alert('Erro ao tentar efetuar login.');
  }
}

function registerHandler(name?: string, email?: string, password?: string) {
  if (name && email && password) {
    registerService(name, email, password).then(() => {
      toggleForm();
    });
  } else {
    alert('Erro ao tentar cadastrar usuário.');
  }
}

provide<TLoginHandler>('loginHandler', loginHandler);
provide<TRegisterHandler>('registerHandler', registerHandler);
</script>

<template>
  <div class="login-container">
    <div class="card login-container__card">
      <span class="icon has-text-white login-container__card__icon">
        <span class="material-icons">lock</span>
      </span>
      <div class="card-content login-container__card__content">
        <transition mode="out-in" name="slide-fade">
          <h4
            :key="cardTitle"
            class="subtitle is-4 login-header is-uppercase login-container__card__content__header"
          >
            {{ cardTitle }}
          </h4>
        </transition>
        <transition mode="out-in" name="fade">
          <login-form v-if="isLogin" key="login" />
          <register-form v-else key="register" />
        </transition>
        <input
          :value="buttonLabel"
          class="button is-white login-container__card__content__switch-btn"
          type="button"
          @click="toggleForm"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  margin: auto;
  max-width: 624px;

  &__card {
    position: relative;
    width: 100%;
    padding-top: 1.5rem;

    &__icon {
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;

      .material-icons {
        background: #404654;
        font-size: 3rem;
        padding: 1rem;
        border-radius: 50%;
      }
    }

    &__content {
      &__header {
        text-align: center;
      }

      &__switch-btn {
        width: 100%;
        margin-top: 1rem;
      }
    }
  }
}
</style>
