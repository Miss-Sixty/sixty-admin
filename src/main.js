import { createApp } from 'vue'
import stores from './stores'

import App from './App.vue'
import router from './router'
import '@/router/interception'
import '@/styles/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import auth from '@/directive/auth' //权限指令

createApp(App).use(stores).use(ElementPlus).use(auth).use(router).mount('#app')
