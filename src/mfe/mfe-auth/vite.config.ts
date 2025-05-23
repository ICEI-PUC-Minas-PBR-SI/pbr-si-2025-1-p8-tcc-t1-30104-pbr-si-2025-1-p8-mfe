import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
// import vueDevTools from 'vite-plugin-vue-devtools';
import federation from '@originjs/vite-plugin-federation';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

import * as fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    compression({ algorithm: 'brotliCompress' }),
    visualizer({ open: true }),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginView': './src/views/LoginView.vue',
        './LogoutButton': './src/components/buttons/LogoutButton.vue',
      },
      remotes: {},
      shared: [
        {
          vue: {
            // @ts-expect-error Prop singleton existe, mas a interface está desatualizada
            singleton: true,
            requiredVersion: '^3.5.13',
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
    port: 3002,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'],
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem')),
    },
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      port: 3002,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  },
  preview: {
    port: 3002,
  },
  build: {
    modulePreload: true,
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'axios'],
        },
      },
    },
  },
});
