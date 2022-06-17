import { createApp } from 'vue'
import stores from './stores'

import App from './App.vue'
import router from './router'
import '@/router/interception'
import '@/styles/index.scss'

import auth from '@/directive/auth' //权限指令

createApp(App).use(stores).use(auth).use(router).mount('#app')
