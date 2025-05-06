/// <reference types="vite/client" />

import type { IUserProfile } from '@/types/User.ts';

declare global {
  interface Window {
    __globalAuth__?: {
      user: IUserProfile | null;
      isAuthenticated: boolean;
    };
  }
}
