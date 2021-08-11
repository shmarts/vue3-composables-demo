import { createApp } from 'vue'
import 'vue-global-api'
import { createRouter, createWebHistory } from 'vue-router'

import After from './routes/After.vue'

import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/before', component: After },
    { path: '/after', component: After },
  ],
})

createApp(App).use(router).mount('#app')
