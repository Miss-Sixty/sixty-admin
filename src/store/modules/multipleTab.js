import { defineStore } from 'pinia'
import { toRaw, unref } from 'vue'

export const useMultipleTabStore = defineStore('multiple-tab', {
  state: () => ({
    tabList: [],
    lastDragEndIndex: 0, // 最后移动的标签的索引
  }),
  actions: {
    async addTab(route) {
      const { path, name, fullPath, params, query, meta } = route
      if (meta?.hideTab || !name || ['PageNotAccess', 'PageNotFound', 'ServiceError', 'NetWorkError', 'Reload'].includes(name)) return

      let updateIndex = -1
      // 检查现有页面，不重复添加选项卡
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })

      if (!tabHasExits) return this.tabList.push(Object.assign({}, route))

      // 如果该选项卡已存在，请执行更新操作
      const curTab = toRaw(this.tabList)[updateIndex]
      if (!curTab) return
      curTab.params = params || curTab.params
      curTab.query = query || curTab.query
      curTab.fullPath = fullPath || curTab.fullPath
      this.tabList.splice(updateIndex, 1, curTab)
    },

    // Close according to key
    async closeTab(tab, router) {
      const close = route => {
        const index = this.tabList.findIndex(item => item.fullPath === route.fullPath)
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router
      const { path } = unref(currentRoute)
      // 关闭不是激活选项卡
      if (path !== tab.path) return close(tab)

      //关闭当前激活选项卡
      let toTarget
      const index = this.tabList.findIndex(item => item.path === path)
      if (index === 0) {
        // 只有一个选项卡，然后跳转到主页，否则跳转到右侧选项卡
        toTarget = this.tabList.length === 1 ? 'Home' : this.tabList[index + 1].name
      } else {
        toTarget = this.tabList[index - 1].name
      }
      close(currentRoute.value)
      await replace({ name: toTarget })
    },

    closeLeftTab(route) {
      // TODO:真的需要循环多次来达成目的吗？
      const index = this.tabList.findIndex(item => item.path === route.path)

      if (index <= 0) return
      const leftTabs = this.tabList.slice(0, index)
      const pathList = []
      for (const item of leftTabs) {
        const affix = item?.meta?.affix ?? false
        !affix && pathList.push(item.fullPath)
      }
      this.tabList = this.tabList.filter(item => !pathList.includes(item.fullPath))
    },

    closeRightTabs(route) {
      const index = this.tabList.findIndex(item => item.fullPath === route.fullPath)
      if (index < 0 && index >= this.tabList.length - 1) return
      const rightTabs = this.tabList.slice(index + 1, this.tabList.length)
      const pathList = []
      for (const item of rightTabs) {
        const affix = item?.meta?.affix ?? false
        !affix && pathList.push(item.fullPath)
      }
      this.tabList = this.tabList.filter(item => !pathList.includes(item.fullPath))
    },

    closeOtherTabs(route) {
      const closePathList = this.tabList.map(item => item.fullPath)
      const pathList = []
      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find(item => item.path === path)
          if (!closeItem) {
            continue
          }
          const affix = closeItem?.meta?.affix ?? false
          !affix && pathList.push(closeItem.fullPath)
        }
      }
      this.tabList = this.tabList.filter(item => !pathList.includes(item.fullPath))
    },

    closeAllTab(router) {
      this.tabList = this.tabList.filter(item => item?.meta?.affix ?? false)
      let toPath = '/home'
      const len = this.tabList.length
      const { path } = unref(router.currentRoute)

      if (len > 0) {
        const page = this.tabList[len - 1]
        const path = page.fullPath || page.path
        if (path) toPath = path
      }

      path !== toPath && router.push(toPath)
    },
  },
})
