import { defineStore } from 'pinia'
import { toRaw, unref } from 'vue'

export const useMultipleTabStore = defineStore('multiple-tab', {
  state: () => ({
    tabList: [],
    activeIndex: null, //右键点击的标签
    disabledLeft: false,
    disabledRight: false,
    disabledOther: false,
    disabledAll: false,
    activeTabItem: {},
    activeContextMenu: false,
  }),
  actions: {
    async addTab(route) {
      const { path, name, fullPath, meta } = route
      if (meta?.hideTab || !name || ['PageNotAccess', 'PageNotFound', 'ServiceError', 'NetWorkError', 'Reload'].includes(name)) return
      // 检查现有页面，不重复添加选项卡
      if (this.tabList.some(tab => (tab.fullPath || tab.path) === (fullPath || path))) return
      this.tabList.push(Object.assign({}, route))
    },

    async closeTab(route, router, tabitem) {
      const close = route => {
        const index = this.tabList.findIndex(item => item.path === route.path)
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { replace } = router
      const { path } = route
      // 关闭不是激活选项卡
      if (path !== tabitem.path) return close(tabitem)

      //关闭当前激活选项卡
      let toTarget
      const index = this.tabList.findIndex(item => item.path === path)
      if (index === 0) {
        // 只有一个选项卡，然后跳转到主页，否则跳转到右侧选项卡
        toTarget = this.tabList.length === 1 ? '/home' : this.tabList[index + 1].path
      } else {
        toTarget = this.tabList[index - 1].path
      }
      close(route)
      await replace(toTarget)
    },

    closeLeftTab(route, router, tabitem) {
      const activeTab = this.activeContextMenu ? route : tabitem
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i]?.meta?.affix) continue
        this.tabList.splice(i, 1)
        if (this.tabList[i].path === activeTab.path) break
        i--
      }
      activeTab.path !== route.path && router.push(activeTab)
    },

    closeRightTabs(route, router, tabitem) {
      const activeTab = this.activeContextMenu ? route : tabitem
      for (let i = this.tabList.length - 1; i >= 0; i--) {
        if (this.tabList[i]?.meta?.affix) continue
        this.tabList.splice(i, 1)
        if (this.tabList[i - 1].path === activeTab.path) break
      }
      activeTab.path !== route.path && router.push(activeTab)
    },

    closeOtherTabs(route, router, tabitem) {
      const activeTab = this.activeContextMenu ? route : tabitem
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i]?.meta?.affix || this.tabList[i].path === activeTab.path) continue
        this.tabList.splice(i, 1)
        i--
      }
      activeTab.path !== route.path && router.push(activeTab)
    },

    closeAllTab(route, router) {
      this.tabList = this.tabList.filter(item => item?.meta?.affix)
      let toPath = '/home'

      const len = this.tabList.length
      if (len > 0) {
        const page = this.tabList[len - 1]
        const path = page.fullPath || page.path
        if (path) toPath = path
      }

      route.path !== toPath && router.push(toPath)
    },

    handleCloseTags(route, router, tabitem) {
      return {
        closeTab: () => this.closeTab(route, router, tabitem),
        closeLeft: () => this.closeLeftTab(route, router, tabitem),
        closeRight: () => this.closeRightTabs(route, router, tabitem),
        closeOther: () => this.closeOtherTabs(route, router, tabitem),
        closeAll: () => this.closeAllTab(route, router),
      }
    },

    //右键点击标签
    handleContextMenu(isExtra, tabItem) {
      this.activeContextMenu = isExtra //点击菜单选项时判断是点击标签还是点击右侧图标
      const index = this.tabList.findIndex(tab => tab.path === tabItem.path)

      const activeLeftList = []
      const activeRightList = []
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i]?.meta?.affix) continue
        if (i < index) activeLeftList.push(this.tabList[i])
        if (i > index) activeRightList.push(this.tabList[i])
      }

      this.disabledLeft = !activeLeftList.length
      this.disabledRight = !activeRightList.length
      this.disabledOther = this.disabledLeft && this.disabledRight
      this.disabledAll = this.disabledOther && tabItem?.meta?.affix
    },
  },
})
