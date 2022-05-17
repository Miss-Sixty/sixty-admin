import { createApp } from 'vue'
import stores from './stores'

import App from './App.vue'
import router from './router'
import '@/router/interception'
import '@/styles/index.scss'
createApp(App).use(stores).use(router).mount('#app')
