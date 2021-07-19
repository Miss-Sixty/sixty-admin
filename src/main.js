import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/styles/element.scss'
import '@/router/permission' //路由守卫
import '../mock/index.js' //引入mock
import '@/icons' // icon
import auth from '@/utils/auth'

//全局组件
import SvgIcon from '@/components/SvgIcon' // svg组件
import PageHeader from '@/components/PageHeader'
import Auth from '@/components/Auth'
import AuthAll from '@/components/AuthAll'
import ToolsBar from '@/components/ToolsBar' //头工具栏
import FixedActionBar from '@/components/FixedActionBar' //固定底部操作栏
import MySwitch from '@/components/MySwitch' //
import Pagination from '@/components/Pagination' //分页

createApp(App)
  .component('SvgIcon', SvgIcon)
  .component('PageHeader', PageHeader)
  .component('Auth', Auth)
  .component('AuthAll', AuthAll)
  .component('ToolsBar', ToolsBar)
  .component('FixedActionBar', FixedActionBar)
  .component('MySwitch', MySwitch)
  .component('Pagination', Pagination)
  .use(auth)
  .use(installElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
