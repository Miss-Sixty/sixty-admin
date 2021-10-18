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
      if (meta?.hideTab || !name || ['PageNotAccess', 'PageNotFound', 'ServiceError', 'NetWorkError'].includes(name)) return

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
      console.log(router)

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
  },
})
