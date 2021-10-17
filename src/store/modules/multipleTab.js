import { defineStore } from 'pinia'

export const useMultipleTabStore = defineStore('multiple-tab', {
  state: () => ({
    tabList: [],
    lastDragEndIndex: 0, // 最后移动的标签的索引
  }),
  actions: {
    async addTab(route) {
      console.log(route)
      if (route?.meta?.hideTab) return
      //   const { path, name, fullPath, params, query, meta } = route
      //   // 404  The page does not need to add a tab
      //   if (
      //     path === PageEnum.ERROR_PAGE ||
      //     path === PageEnum.BASE_LOGIN ||
      //     !name ||
      //     [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name)
      //   ) {
      //     return
      //   }

      //   let updateIndex = -1
      //   // Existing pages, do not add tabs repeatedly
      //   const tabHasExits = this.tabList.some((tab, index) => {
      //     updateIndex = index
      //     return (tab.fullPath || tab.path) === (fullPath || path)
      //   })

      //   // If the tab already exists, perform the update operation
      //   if (tabHasExits) {
      //     const curTab = toRaw(this.tabList)[updateIndex]
      //     if (!curTab) {
      //       return
      //     }
      //     curTab.params = params || curTab.params
      //     curTab.query = query || curTab.query
      //     curTab.fullPath = fullPath || curTab.fullPath
      //     this.tabList.splice(updateIndex, 1, curTab)
      //   } else {
      //     // Add tab
      //     // 获取动态路由打开数，超过 0 即代表需要控制打开数
      //     const dynamicLevel = meta?.dynamicLevel ?? -1
      //     if (dynamicLevel > 0) {
      //       // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
      //       // 首先获取到真实的路由，使用配置方式减少计算开销.
      //       // const realName: string = path.match(/(\S*)\//)![1];
      //       const realPath = meta?.realPath ?? ''
      //       // 获取到已经打开的动态路由数, 判断是否大于某一个值
      //       if (this.tabList.filter(e => e.meta?.realPath ?? '' === realPath).length >= dynamicLevel) {
      //         // 关闭第一个
      //         const index = this.tabList.findIndex(item => item.meta.realPath === realPath)
      //         index !== -1 && this.tabList.splice(index, 1)
      //       }
      //     }
      this.tabList.push(route)
      console.log(this.tabList)
      //   }
      //   this.updateCacheTab()
      //   cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList)
    },
  },
})
