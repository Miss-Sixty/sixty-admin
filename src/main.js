import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import 'element-plus/packages/theme-chalk/src/base.scss'

import '@/styles/index.scss'
import '@/styles/element.scss'
import '@/router/permission' //路由守卫
import '@/icons' // icon
import auth from '@/utils/auth' //权限指令
import autoComponets from './components' // 全局组件自动注册

import '../mock/index.js' //引入mock

createApp(App).use(autoComponets).use(auth).use(installElementPlus).use(store).use(router).mount('#app')
