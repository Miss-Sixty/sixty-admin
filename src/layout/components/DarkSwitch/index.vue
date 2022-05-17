<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-switch
    :before-change="toggleDark"
    active-color="#2C2C2C"
    inactive-color="#A3A6AD"
    :model-value="isDark"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
  />
</template>
