<script setup name="FixedActionBar">
const props = defineProps({
  contentStyle: Object,
})

const style = computed(() => props.contentStyle)
</script>

<template>
  <el-affix position="bottom" target="#app">
    <slot name="body">
      <el-row justify="center" :style="style">
        <slot />
      </el-row>
    </slot>
  </el-affix>
</template>
