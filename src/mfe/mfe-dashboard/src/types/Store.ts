import type { Ref } from 'vue';
import type { StoreGeneric } from 'pinia';

import type { IUser } from '@/types/User.ts';

export interface IAuthState extends StoreGeneric {
  isAuthenticated: Ref<boolean>;
  user: Ref<IUser>;
}
