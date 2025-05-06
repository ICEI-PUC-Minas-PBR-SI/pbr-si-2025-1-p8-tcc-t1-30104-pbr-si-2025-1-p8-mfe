import authApi from '@/api/authApi.ts';

export default async function registerService(name: string, username: string, password: string) {
  try {
    const response = await authApi.post('/register', { name, username, password });

    window.dispatchEvent(new CustomEvent('auth:login'));

    return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.message;
  }
}
