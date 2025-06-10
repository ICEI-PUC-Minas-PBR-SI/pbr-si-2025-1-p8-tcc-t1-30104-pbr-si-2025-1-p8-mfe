import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import basicSsl from '@vitejs/plugin-basic-ssl';
import federation from '@originjs/vite-plugin-federation';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    vue(),
    compression({ algorithm: 'brotliCompress' }),
    basicSsl(),
    federation({
      name: 'another-auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AnotherAuth': './src/App.vue',
      },
      remotes: {},
      shared: [
        {
          vue: {
            // @ts-expect-error Prop singleton existe, mas a interface está desatualizada
            singleton: true,
            eager: false,
          },
          bulma: {
            // @ts-expect-error Prop singleton existe, mas a interface está desatualizada
            singleton: true,
            requiredVersion: '^1.0.3',
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
    port: 3012,
    // @ts-expect-error O plugin basic-ssl garante que o https possa ser do tipo boolean
    https: true,
    cors: true,
    host: 'another.auth.localhost',
    origin: 'https://another.auth.localhost',
  },
  preview: {
    port: 3012,
    // @ts-expect-error O plugin basic-ssl garante que o https possa ser do tipo boolean
    https: true,
    host: 'another.auth.localhost',
  },
  build: {
    modulePreload: true,
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
        },
      },
    },
  },
});
