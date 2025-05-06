import './assets/main.scss';

import('./views/DashboardView.vue');

import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
