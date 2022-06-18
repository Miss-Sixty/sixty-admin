import { createApp } from 'vue'
import stores from './stores'

import App from './App.vue'
import router from './router'
import '@/router/interception'
import '@/styles/index.scss'

import autoComponets from '@/components' // 全局组件自动注册
import authDirective from '@/directive/auth' //权限指令
createApp(App).use(stores).use(router).use(autoComponets).use(authDirective).mount('#app')
