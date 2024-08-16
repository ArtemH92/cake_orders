import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import { MyPreset } from '../primevueConfig';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
      preset: MyPreset,
  }
});
app.use(ToastService);
app.use(createPinia())
app.use(router)

app.mount('#app')
