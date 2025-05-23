/// <reference types="vite/client" />

declare module 'auth/*' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'dashboard/*' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'with-auth/*' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'half-auth/*' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'another-auth/*' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module 'without-auth/*' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

import type { IUser } from '@/types/User';

declare global {
  interface Window {
    __globalAuth__?: {
      user: IUser | null;
      isAuthenticated: boolean;
    };
  }
}
