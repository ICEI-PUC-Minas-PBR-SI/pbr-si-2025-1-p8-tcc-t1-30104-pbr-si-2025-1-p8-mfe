/// <reference types="vite/client" />

import type { IUser } from '@/types/User.ts';

declare global {
  interface Window {
    __globalAuth__?: {
      user: IUser;
      isAuthenticated: boolean;
    };
  }
}
