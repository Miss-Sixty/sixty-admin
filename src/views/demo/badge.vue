<template>
  <div>
    <el-card :title="data.title">data.content</el-card>
    <el-card style="margin: 20px">
      <p style="margin-bottom: 20px">{{ data.text }}</p>

      <el-button type="primary" @click="handelDot" v-if="type === 'dot'">显示/隐藏</el-button>
      <el-input-number :model-value="number" @change="handelNumber" v-if="type === 'number'" />
      <el-button-group v-if="type === 'text'">
        <el-button type="primary" @click="handelText">切换</el-button>
        <el-button type="primary" @click="handelText('empty')">清空</el-button>
      </el-button-group>
    </el-card>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
const props = defineProps({
  type: {
    type: String,
    default: 'dot',
  },
})
const appStore = useAppStore()
const dot = computed(() => appStore.dot)
const number = computed(() => appStore.number)
const text = computed(() => appStore.text)
const obj = (type) => {
  const status = {
    dot: {
      title: '点标记',
      content: '搭配 Pinia 可实现动态设置',
      text: `当前 badge 值：${dot.value}`,
    },
    number: {
      title: '数字标记',
      content: '搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏',
      text: `当前 badge 值：${number.value}`,
    },
    text: {
      title: '文字标记',
      content: '搭配 Pinia 可实现动态设置。请控制文字展示长度，避免导航标记覆盖导航标题',
      text: `当前 badge 值：${text.value}`,
    },
  }
  return status[type]
}
const data = computed(() => obj(props.type))
const handelDot = () => (appStore.dot = !appStore.dot)
const handelNumber = (val) => (appStore.number = val)
const handelText = (val) => {
  if (val === 'empty') return (appStore.text = '')
  appStore.text = text.value === '热门' ? '活动' : '热门'
}
</script>
