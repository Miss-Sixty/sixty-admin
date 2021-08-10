<template>
  <div>
    <page-header icon="none" icon-text="none" title="Print 打印">
      打印使用
      <el-link type="primary" href="https://printjs.crabbly.com/" target="_blank"> Print.js </el-link>
      详细配置请参考官方文档。
    </page-header>

    <el-space wrap class="content">
      <el-card v-for="(item, index) in list" :key="index" v-loading="item.loading">
        <template #header>
          <el-row justify="space-between" align="middle">
            <span>{{ item.title }}</span>
            <div>
              <el-button size="mini" type="success" @click="printChange(item.url || item.id, item.type, index)"> 打印 </el-button>
            </div>
          </el-row>
        </template>
        <el-image v-if="item.url" :src="item.url" :preview-src-list="[item.url]" />
        <div v-else id="print-text-demo">
          那些男孩，教会我成长，那些女孩,教会我爱……
          他们曾经出现在我的生命里，然后又消失不见，可是，我不相信他们是天使，他们是世间最普通的男孩和女孩，所以我就一直这么站在香樟树下等待着，因为我相信，他们总有一天会回来，回来找我，教会我更多的事。
          <p style="text-align: right">-- 夏至未至</p>
        </div>
      </el-card>
    </el-space>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import printJS from 'print-js'
const list = reactive([
  {
    title: '打印图片',
    url: 'https://picsum.photos/180/150',
    type: 'image',
    loading: false,
  },
  {
    title: '打印局部页面',
    id: 'print-text-demo',
    type: 'html',
    loading: false,
  },
])

//打印
function printChange(printable, type, index) {
  printJS({
    onLoadingStart: () => (list[index].loading = true),
    onLoadingEnd: () => (list[index].loading = false),
    printable,
    type,
  })
}
</script>
<style lang="scss" scoped>
.content {
  //   width: 300px;
  //   height: 300px;
  margin: 10px;
}
</style>
