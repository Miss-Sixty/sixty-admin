<script setup name="KeepAlivePageIndex">
import { onBeforeRouteLeave } from 'vue-router'
import useKeepAliveStore from '@/stores/keepAlive'
const keepAliveStore = useKeepAliveStore()
const openKeepAlive = ref(false)
const num = ref(1)

onBeforeRouteLeave((to, from) => {
  const componentName = from.matched[to.matched.length - 1].components.default.name
  if (openKeepAlive.value) {
    // 因为并不是所有的路由跳转都需要将当前页面进行缓存，例如最常见的情况，从列表页进入详情页，则需要将列表页缓存，而从列表页跳转到其它页面，则不需要将列表页缓存
    // 所以下面的代码意思就是，如果目标路由的 name 是 keepAlivePageDetail 或者 keepAlivePageNestedDetail ，则将当前页面组件的 name 添加进 keep-alive 中，否则则删除
    if (['keepAlivePageDetail', 'keepAlivePageNestedDetail'].includes(to.name)) {
      keepAliveStore.add(componentName)
    } else {
      keepAliveStore.remove(componentName)
    }
  } else {
    keepAliveStore.remove(componentName)
  }
})
</script>

<template>
  <div>
    <el-page-header title="页面缓存" />
    <el-card>
      <div class="block">
        <el-switch v-model="openKeepAlive" active-text="开启缓存" inactive-text="关闭缓存" />
      </div>
      <div class="block">
        <el-input-number v-model="num" />
      </div>
      <div class="block">
        <router-link :to="{ name: 'keepAlivePageDetail' }" custom v-slot="{ navigate }">
          <el-button @click="navigate">进入同级路由页面</el-button>
        </router-link>
        <router-link :to="{ name: 'keepAlivePageNestedDetail' }" custom v-slot="{ navigate }">
          <el-button @click="navigate">进入下级路由页面</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.block {
  margin-bottom: 10px;
}
</style>
