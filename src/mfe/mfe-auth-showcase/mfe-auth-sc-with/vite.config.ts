import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import federation from '@originjs/vite-plugin-federation';

import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    federation({
      name: 'with-auth',
      filename: 'remoteEntry.js',
      exposes: {
        './WithAuthModal': './src/components/WithAuthModal.vue',
      },
      remotes: {},
      shared: ['vue', 'pinia'],
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
    port: 3010,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'],
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../../key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../cert.pem')),
    },
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      port: 3010,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  },
});
