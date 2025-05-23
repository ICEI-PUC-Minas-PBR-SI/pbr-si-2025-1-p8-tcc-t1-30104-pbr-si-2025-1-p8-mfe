import { defineStore } from 'pinia';

import type { IUser } from '@/types/User.ts';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(user: IUser) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    checkAuth() {
      this.isAuthenticated = document.cookie.includes('auth_token=');
    },
    fillUserSession() {
      if (!this.user) {
        const stored = sessionStorage.getItem('auth:user');
        const authPayload = stored ? JSON.parse(stored) : null;

        if (authPayload) {
          this.login(authPayload.user);
        }
      }
    },
    simulateNotAuthenticated() {
      window.__globalAuth__ = {
        user: null,
        isAuthenticated: false,
      };
    },
    simulateAuthenticated() {
      window.__globalAuth__ = {
        user: this.user,
        isAuthenticated: true,
      };
    },
  },
  getters: {
    simulatedAuthStatus() {
      return !!window.__globalAuth__ ? window.__globalAuth__.isAuthenticated : true;
    },
    readCookie() {
      return document.cookie;
    },
  },
});
