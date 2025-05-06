import authApi from '@/api/authApi.ts';

import type { IUserProfile } from '@/types/User.ts';

export default async function fetchUserInfo(): Promise<IUserProfile> {
  try {
    const response = await authApi.get('/profile');

    const user = response.data;

    window.dispatchEvent(
      new CustomEvent('auth:user', {
        detail: {
          source: 'mfe-auth',
          payload: user,
        },
      }),
    );

    window.__globalAuth__ = {
      user,
      isAuthenticated: true,
    };

    sessionStorage.setItem('auth:user', JSON.stringify({ user, isAuthenticated: true }));

    return user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.message;
  }
}
