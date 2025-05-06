import authApi from '@/api/authApi.ts';

export default async function logoutService() {
  try {
    const response = await authApi.post('/logout');

    window.dispatchEvent(new Event('auth:logout'));

    window.__globalAuth__ = {
      user: null,
      isAuthenticated: false,
    };

    sessionStorage.removeItem('auth:user');

    return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.message;
  }
}
