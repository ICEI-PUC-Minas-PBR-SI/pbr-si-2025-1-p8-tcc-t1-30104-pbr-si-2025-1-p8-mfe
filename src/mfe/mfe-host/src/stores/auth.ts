import { defineStore } from 'pinia';

import type { IUser } from '@/types/User.ts';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  cookieBackup: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    isAuthenticated: false,
    user: null,
    cookieBackup: '',
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
    revokeCookie() {
      this.cookieBackup = document.cookie;
      document.cookie = 'auth_token=; Max-Age=0; path=/; Secure; SameSite=None';
      this.isAuthenticated = false;

      sessionStorage.removeItem('auth:user');
      window.__globalAuth__ = {
        user: null,
        isAuthenticated: false,
      };
    },
    ratifyCookie() {
      document.cookie = this.cookieBackup;
      this.cookieBackup = '';
      this.isAuthenticated = true;

      const auth = {
        user: this.user,
        isAuthenticated: this.isAuthenticated,
      };

      sessionStorage.setItem('auth:user', JSON.stringify(auth));
      window.__globalAuth__ = auth;
    },
  },
  getters: {
    readCookie() {
      return document.cookie;
    },
  },
});
