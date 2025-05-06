import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
// import vueDevTools from 'vite-plugin-vue-devtools';
import federation from '@originjs/vite-plugin-federation';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        auth: 'https://localhost:3002/assets/remoteEntry.js',
        dashboard: 'https://localhost:3003/assets/remoteEntry.js',
      },
      shared: [
        {
          vue: {
            // @ts-expect-error Prop singleton existe, mas a interface está desatualizada
            singleton: true,
            requiredVersion: '^3.5.13',
          },
          pinia: {
            // @ts-expect-error Interface desatualizada
            singleton: true,
            requiredVersion: '^3.0.1',
          },
          'vue-router': {
            // @ts-expect-error Interface desatualizada
            singleton: true,
            requiredVersion: '^4.5.0',
          },
          axios: {
            requiredVersion: '^1.8.4',
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@bulma': fileURLToPath(new URL('./node_modules/bulma', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem')),
    },
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      port: 3000,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
