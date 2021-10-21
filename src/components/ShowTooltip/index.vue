<template>
  <el-tooltip v-bind="$attrs" :content="content" class="tooltip" :disabled="!showTooltip">
    <span ref="domRef" :style="styles">
      {{ content }}
    </span>
  </el-tooltip>
</template>

<script>
import { ref, watch, computed, nextTick } from 'vue'

export default {
  name: 'ShowTooltip',
}
</script>

<script setup>
const props = defineProps({
  content: String,
  style: Object,
})

const showTooltip = ref(false)
const domRef = ref()

//判断是否显示弹窗
const handleTooltipIn = () => {
  const $content = domRef.value
  let range = document.createRange()
  range.setStart($content, 0)
  range.setEnd($content, $content.childNodes.length)
  const rangeWidth = range.getBoundingClientRect().width
  showTooltip.value = rangeWidth > $content.offsetWidth || $content.scrollWidth > $content.offsetWidth
  range = null
}

watch(
  () => props.content,
  () => {
    nextTick(handleTooltipIn)
  },
  {
    immediate: true,
  }
)

const styles = computed(() => {
  const style = {
    display: 'block',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    ...props.style,
  }

  return style
})
</script>

<style lang="scss" scoped>
.tooltip {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
