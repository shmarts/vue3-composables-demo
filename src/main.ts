import { createApp } from 'vue'
import 'vue-global-api'
import { createRouter, createWebHistory } from 'vue-router'

import Before from './routes/Before.vue'
import After from './routes/After.vue'
import Search from './routes/Search.vue'
import Form from './routes/Form.vue'

import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/before', component: Before },
    { path: '/after', component: After },
    { path: '/search', component: Search },
    { path: '/form', component: Form },
  ],
})

createApp(App).use(router).mount('#app')
