<template>
  <div v-loading="state.loading" class="tag-wrap" :class="{ shadow: props.isScrollTop }" element-loading-spinner="el-icon-loading">
    <el-scrollbar ref="scrollBar" view-class="tag-view" height="50px">
      <router-link
        v-for="tag in visitedViews"
        :ref="el => tags.push(el)"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tag"
        :class="{ 'tag--active': isActive(tag) }"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span>{{ tag.meta?.title || 'no-name' }}</span>
        <i v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </el-scrollbar>
    <i class="el-icon-menu icon" @click.prevent.stop="openMenu(state.selectedTag, $event)" />

    <transition name="fade">
      <ul v-show="state.visible" class="contextmenu" :style="{ left: state.left + 'px', top: state.top + 'px' }">
        <li v-if="!isAffix(state.selectedTag)" @click="closeSelectedTag(state.selectedTag)"><i class="el-icon-close" />关闭</li>
        <li @click="closeOthersTags('others')"><i class="el-icon-finished" />关闭其他</li>
        <li @click="closeOthersTags('left')"><i class="el-icon-back" />关闭到左侧</li>
        <li @click="closeOthersTags('right')"><i class="el-icon-right" />关闭到右侧</li>
        <li @click="closeOthersTags('all')"><i class="el-icon-circle-close" />全部关闭</li>
      </ul>
    </transition>
  </div>
</template>
<script setup>
import { reactive, computed, watch, onMounted, ref, nextTick, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import path from 'path'
import { tagview } from '@/api/user'
const props = defineProps({
  isScrollTop: Boolean,
})

const store = useStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  visible: false,
  baseTags: [], //用户请求来的固定tag名字列表
  affixTags: [], //处理后的固定tag列表
  top: 0,
  left: 0,
  selectedTag: {},
  loading: true,
})
const tags = ref([])
const scrollBar = ref(null)

const visitedViews = computed(() => store.state.tagsView.visitedViews)
const routes = computed(() => store.getters['menu/tagList'])

// 初始化tags
const initTags = async () => {
  try {
    state.loading = true
    const { data } = await tagview() //获取该用户固定的tags
    state.baseTags = data
    state.affixTags = filterAffixTags(routes.value)
    for (const tag of state.affixTags) {
      tag.name && store.commit('tagsView/ADD_VIEW', tag)
    }

    addTags()
    moveToCurrentTag()
    state.loading = false
  } catch (err) {
    console.log(err)
  }
}

//过滤出固定显示的tags
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach(route => {
    if (state.baseTags.includes(route.name)) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) tags = [...tags, ...tempTags]
    }
  })
  return tags
}

//添加tag
const addTags = () => {
  console.log(visitedViews)
  state.selectedTag = route
  route.name && store.commit('tagsView/ADD_VIEW', route)
}

//右键显示菜单
const openMenu = (tag, e) => {
  console.log(tag)
  const offsetLeft = scrollBar.value.$el.getBoundingClientRect().left
  const offsetTop = scrollBar.value.$el.getBoundingClientRect().top
  const offsetWidth = scrollBar.value.$el.offsetWidth
  const maxLeft = offsetWidth - 100
  const left = e.clientX - offsetLeft + 15
  left > maxLeft ? (state.left = maxLeft) : (state.left = left)
  state.top = e.clientY - offsetTop + 16
  state.visible = true
  state.selectedTag = tag //当前点击的tag
}
const isAffix = tag => state.baseTags.includes(tag?.name)

watch(
  () => route.name,
  () => {
    const ignore = ['Login', '404', 'Reload']
    if (ignore.includes(route.name)) return
    console.log(222)
    addTags()
    moveToCurrentTag()
  }
)

const closeMenu = () => (state.visible = false)
watch(
  () => state.visible,
  val => (val ? document.body.addEventListener('click', closeMenu) : document.body.removeEventListener('click', closeMenu))
)

const isActive = tag => tag.path === route.path

//关闭tag
const closeSelectedTag = view => {
  store.dispatch('tagsView/delView', view).then(visitedViews => isActive(view) && toLastView(visitedViews))
}

//最后一个tag
const toLastView = visitedViews => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) return router.push(latestView.fullPath)
  router.push('/')
}

//关闭指定tag
// TODO:这里全部关闭后跳转首页处理的不好，页面会跳动，因为它是先全部删了在添加首页
// TODO:如果只剩固定的tag，则右键关闭时会快速跳转页面
const closeOthersTags = type => {
  router.push(state.selectedTag)
  store
    .dispatch('tagsView/delOthersViews', {
      tag: state.selectedTag,
      type,
      tagViewList: state.baseTags,
    })
    .then(res => toLastView(res))
}

//使tag显示在视区内
const moveToCurrentTag = () => {
  console.log(tags)
  nextTick(() => {
    for (const tag of tags.value) {
      if (tag.to.path === route.path) {
        scrollBar.value.setScrollLeft(tag.$el.offsetLeft)
        break
      }
    }
  })
}

onMounted(() => {
  initTags()
})
</script>
<style lang="scss" scoped>
.tag-wrap {
  background-color: $navmenu-bg;
  transition: box-shadow 0.2s;
  box-shadow: 0 0 1px 0 #ccc;
  position: relative;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.shadow {
    box-shadow: 0 10px 10px -10px #ccc;
  }

  .icon {
    font-size: 22px;
    margin-right: 16px;
    padding: 4px;
    cursor: pointer;
  }

  .tag {
    padding: 4px 10px 4px 15px;
    border-radius: 2px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #d8dce5;
    transition-property: border-color, background-color, color;
    transition-duration: 0.3s;
    user-select: none;
    white-space: nowrap;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover {
      border-color: #538cff;
      background-color: #538cff;
      color: #fff;
      > i {
        color: #fff;
        width: 15px;
      }
    }

    > span {
      margin-right: 5px;
    }

    > i {
      text-align: center;
      display: inline-block;
      overflow: hidden;
      border-radius: 50%;
      transition-property: width, background-color;
      transition-duration: 0.3s;
      width: 0;
      &:hover {
        background-color: #ea5964;
      }
    }

    &--active {
      background-color: #538cff;
      color: #fff;
      border-color: #538cff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 10px 0;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      line-height: 34px;
      padding: 0 20px;
      cursor: pointer;
      color: #606266;
      transition-property: color, background-color;
      transition-duration: 0.3s;
      font-size: 14px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
      }
      > i {
        font-size: 16px;
        margin-right: 4px;
      }
    }
  }
}

//上下居中loading图标
:deep(.el-loading-spinner) {
  margin-top: -10px;
}

:deep(.tag-view) {
  display: inline-flex;
  padding: 10px 15px;
  flex-wrap: nowrap;
}
:deep(.el-scrollbar) {
  flex: 1;
}
:deep(.el-scrollbar__view) {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
