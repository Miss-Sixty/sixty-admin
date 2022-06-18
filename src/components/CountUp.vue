<template>
  <span ref="refDom" />
</template>

<script setup name="CountUp">
import { CountUp } from 'countup.js'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
const props = defineProps({
  startVal: {
    type: Number,
    default: 0,
  },
  endVal: {
    type: Number,
    required: true,
  },
  //   options: Object,
  //小数点位数
  decimalPlaces: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0
    },
  },
  // 以秒为单位的动画持续时间 (2)
  duration: {
    type: Number,
    default: 2,
  },
  //是否添加分隔符
  useGrouping: {
    type: Boolean,
    default: true,
  },
  //分隔符
  separator: {
    type: String,
    default: ',',
  },
  //前面内容
  prefix: {
    type: String,
    default: '',
  },
  //后面内容
  suffix: {
    type: String,
    default: '',
  },
})
const refDom = ref()
let countUp
const init = () => {
  if (countUp) return
  const instance = new CountUp(refDom.value, props.endVal, {
    ...props,
  })

  // error
  if (instance.error) return
  countUp = instance
  countUp.start()
}

onMounted(init)
watch(
  () => props.endVal,
  (num) => update(num)
)

// 开始
const start = (callback) => {
  countUp && countUp.start(callback)
}

// 重置
const reset = () => {
  countUp && countUp.reset()
}

// 暂停/继续
const pauseResume = () => {
  countUp && countUp.pauseResume()
}

//更新
const update = (num) => {
  countUp && countUp.update(num)
}

defineExpose({ start, reset, pauseResume, update })
onBeforeUnmount(() => (countUp = null))
</script>
