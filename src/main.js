import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import useElementPlus from '@/plugins/element-plus'
import autoComponets from '@/components' // 全局组件自动注册
import auth from '@/directive/auth' //权限指令
import '@/router/interception'
import '@/styles/index.scss'

createApp(App).use(router).use(store).use(useElementPlus).use(autoComponets).use(auth).mount('#app')
