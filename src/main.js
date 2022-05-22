import { createApp } from 'vue'
import stores from './stores'

import App from './App.vue'
import router from './router'
import '@/router/interception'
import '@/styles/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(stores).use(ElementPlus).use(router).mount('#app')
