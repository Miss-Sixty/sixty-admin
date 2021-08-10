<template>
  <div>
    <page-header icon="none" icon-text="none" title="Print 打印">
      基于
      <el-link type="primary" href="https://printjs.crabbly.com/" target="_blank"> Print.js </el-link> 。可打印 pdf, html, image, json
      四种类型数据，更多参数说明请查看文档
    </page-header>

    <el-space wrap class="content">
      <el-card v-for="(item, index) in list" :key="index" v-loading="item.loading">
        <div v-if="item.type === 'html'" id="print-text-demo">
          那些男孩，教会我成长，那些女孩,教会我爱……
          他们曾经出现在我的生命里，然后又消失不见，可是，我不相信他们是天使，他们是世间最普通的男孩和女孩，所以我就一直这么站在香樟树下等待着，因为我相信，他们总有一天会回来，回来找我，教会我更多的事。
          <p style="text-align: right">-- 夏至未至</p>
        </div>
        <div v-if="item.type === 'someJSONdata'">{{ item.properties }}</div>

        <div>
          <el-button type="success" @click="printChange(index)"> {{ item.title }} </el-button>
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
    title: '打印局部页面',
    printable: 'print-text-demo',
    type: 'html',
    loading: false,
  },
  {
    title: '打印图片',
    printable: 'https://picsum.photos/180/150',
    type: 'image',
    loading: false,
  },
  {
    title: '打印JSON',
    printable: [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        phone: '111-111-1111',
      },
      {
        name: 'Barry Allen',
        email: 'barry@flash.com',
        phone: '222-222-2222',
      },
      {
        name: 'Cool Dude',
        email: 'cool@dude.com',
        phone: '333-333-3333',
      },
    ],
    type: 'json',
    properties: [
      { field: 'name', displayName: 'Full Name' },
      { field: 'email', displayName: 'E-mail' },
      { field: 'phone', displayName: 'Phone' },
    ],
    loading: false,
  },
])

//打印
function printChange(index) {
  const data = list[index]

  printJS({
    onLoadingStart: () => (data.loading = true),
    onLoadingEnd: () => (data.loading = false),
    printable: data.printable,
    properties: data.properties,
    type: data.type,
  })
}
</script>
<style lang="scss" scoped>
.content {
  margin: 10px;
}
</style>
