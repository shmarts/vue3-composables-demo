import { createApp } from 'vue'
import 'vue-global-api'
import { createRouter, createWebHistory } from 'vue-router'

import Demo from './routes/Demo.vue'
import Search from './routes/Search.vue'
import Form from './routes/Form.vue'

import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/demo', component: Demo },
    { path: '/search', component: Search },
    { path: '/form', component: Form },
  ],
})

createApp(App).use(router).mount('#app')
