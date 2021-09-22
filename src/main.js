import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import elementPlus from '@/plugins/element'
import autoComponets from '@/components' // 全局组件自动注册
import auth from '@/directive/auth' //权限指令
import '@/router/interception'
import '@/styles/index.scss'
import '../mock/index.js' //引入mock

createApp(App).use(router).use(store).use(elementPlus).use(autoComponets).use(auth).mount('#app')
