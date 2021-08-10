import { createApp } from 'vue'
import 'vue-global-api'
import { createRouter, createWebHistory } from 'vue-router'

import UseWindow from './routes/UseWindow.vue'

import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/use-window', component: UseWindow },
    { path: '/use-window-2', component: UseWindow },
  ],
})

createApp(App).use(router).mount('#app')
