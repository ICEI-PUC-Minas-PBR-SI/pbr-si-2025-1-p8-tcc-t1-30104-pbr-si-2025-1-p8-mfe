import authApi from '@/api/authApi.ts';

import type { ILoginParams } from '@/types/Login.ts';

export default async function loginService(params: ILoginParams) {
  try {
    const response = await authApi.post('/login', {
      email: params.email,
      password: params.password,
    });

    window.dispatchEvent(new CustomEvent('auth:login'));

    return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.message;
  }
}
