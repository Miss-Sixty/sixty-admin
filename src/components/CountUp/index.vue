<template>
  <div ref="refDom"></div>
</template>
<script>
export default {
  name: 'CountUp',
}
</script>
<script setup>
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
  options: Object,
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
const refDom = ref(null)

let countUp
const init = () => {
  countUp = new CountUp(refDom.value, props.endVal, {
    ...props.options,
    startVal: props.startVal,
    endVal: props.endVal,
    decimalPlaces: props.decimalPlaces,
    duration: props.duration,
    useGrouping: props.useGrouping,
    separator: props.separator,
    prefix: props.prefix,
    suffix: props.suffix,
  })

  countUp.start()
}
//开始
const start = () => init()

//暂停/继续
const pauseResume = () => countUp.pauseResume()

//重置
const reset = () => countUp.reset()

//更新
const update = num => countUp.update(num)

onMounted(() => {
  start()
})

watch(
  () => props.endVal,
  num => update(num)
)

defineExpose({ pauseResume, reset, start, update })

onBeforeUnmount(() => (countUp = null))
</script>
