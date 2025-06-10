import authApi from '@/api/authApi.ts';

export default async function registerService(name: string, email: string, password: string) {
  try {
    const response = await authApi.post('/register', { name, email, password });

    window.dispatchEvent(new CustomEvent('auth:login'));

    return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data.message || error.message;
    throw new Error(message);
  }
}
