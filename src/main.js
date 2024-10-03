import './assets/main.css'
import Vue3Toastify from 'vue3-toastify';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000
});
app.mount('#app')
