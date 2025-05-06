import authApi from '@/services/authApi.ts';

import type { IUser } from '@/types/User.ts';

export default async function fetchUserInfo(): Promise<IUser> {
  try {
    const response = await authApi.get('/profile');

    return response.data;
  } catch (error: any) {
    return error.message;
  }
}
