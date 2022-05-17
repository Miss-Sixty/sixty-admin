export default {
  app: {
    /**
     * 是否开启权限功能，权限功能提供以下鉴权支持：
     * 1、路由鉴权
     * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
     * 3、鉴权指令：v-auth、v-auth-all
     * 4、鉴权函数：this.$auth()、this.$authAll()
     */
    enablePermission: false,
    grayMode: false, // 灰色模式
  },

  // 侧边栏
  sidebar: {
    alwaysShowSidebarMain: true,
    subMenuCollapse: false, // 导航是否收起
  },

  header: {
    enableSidebarCollapse: true, //导航折叠按钮
    enableBreadcrumb: true, // 面包屑导航
    enableNotification: true, // 通知中心
    enablePageReload: true, // 页面刷新
    enableFullscreen: true, // 全屏
    enableSetting: true, // 设置
    enableDarkSwitch: true, // 暗黑模式切换
  },
}
