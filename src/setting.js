export default {
  title: "sixty-admin 后台管理系统",
  // 是否显示底部版权信息。
  //TODO:在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
  showCopyright: true,
  // 版权信息配置，格式为：Copyright © [dates] <company>
  copyrightDates: new Date().getFullYear(),
  copyrightCompany: "sixty-admin",
  copyrightWebsite: "https://baidu.com",

  // 是否始终显示主侧边栏，设置为 false 且主侧边栏里只有一个导航时，主侧边栏会自动隐藏
  alwaysShowMainSidebar: false,
};
