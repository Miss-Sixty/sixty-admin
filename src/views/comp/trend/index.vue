<template>
  <div>
    <page-header no-icon title="趋势符号 Trend" content="标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外" />

    <el-row style="padding: 20px" :gutter="20">
      <el-col :span="8" v-for="(trend, index) in list" :key="index">
        <page-main :title="trend.title">
          <el-space direction="vertical">
            <trend
              v-for="(item, i) in trend.trends"
              :key="i"
              :value="item.value"
              :type="item.type"
              :reverse="item.reverse"
              :prefix="item.prefix"
              :suffix="item.suffix"
            />
          </el-space>
        </page-main>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
const list = [
  {
    title: '基础用法',
    trends: [
      {
        value: '12.3',
      },
      {
        value: '12.3',
        type: 'down',
      },
    ],
  },
  {
    title: '颜色反转',
    trends: [
      {
        value: '12.3',
        reverse: true,
      },
      {
        value: '12.3',
        type: 'down',
        reverse: true,
      },
    ],
  },
  {
    title: '前缀后缀',
    trends: [
      {
        value: '12.3',
        prefix: '$',
      },
      {
        value: '12.3',
        type: 'down',
        suffix: '%',
      },
    ],
  },
]
</script>
