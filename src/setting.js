export default {
  showCopyright: true, // 是否显示底部版权信息。
  // 版权信息配置，格式为：Copyright © [dates] <company>
  copyrightDates: new Date().getFullYear(),
  copyrightCompany: 'sixty-admin',
  copyrightWebsite: 'https://github.com/Miss-Sixty/sixty-admin',

  // 是否始终显示主侧边栏，设置为 false 且主侧边栏里只有一个导航时，主侧边栏会自动隐藏
  alwaysShowMainSidebar: true,
  // showTagView: false, //是否显示标签视图

  // 头部配置
  headerSetting: {
    show: true, // 是否显示顶部
    useLockPage: true, // 开启锁屏功能
    showFullScreen: true, // 显示全屏按钮
    showSetting: true, //展示设置按钮
    showInternational: true, //展示国际化
  },

  // 菜单配置
  menuSetting: {
    show: true, // 是否显示菜单
  },
}
