import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import basicSsl from '@vitejs/plugin-basic-ssl';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    basicSsl(),
    federation({
      name: 'another-auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AnotherAuth': './src/App.vue',
      },
      remotes: {},
      shared: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@bulma': fileURLToPath(new URL('./node_modules/bulma', import.meta.url)),
    },
  },
  server: {
    port: 3012,
    // @ts-expect-error O plugin basic-ssl garante que o https possa ser do tipo boolean
    https: true,
    cors: true,
    open: 'https://another.auth.localhost:3012/',
    origin: 'https://another.auth.localhost',
  },
  preview: {
    port: 3012,
    // @ts-expect-error O plugin basic-ssl garante que o https possa ser do tipo boolean
    https: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
});
