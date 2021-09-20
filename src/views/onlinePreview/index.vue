<template>
  <div class="online-preview">
    <page-header no-icon title="预览 office 文件">
      <p style="margin-bottom: 10px">可以在线查看 Word、Excel、PowerPoint 文件</p>
      <el-radio-group v-model="radioValue" size="small">
        <el-radio-button label="word">文字 Word</el-radio-button>
        <el-radio-button label="excel">表格 Excel</el-radio-button>
        <el-radio-button label="ppt">演示 PowerPoint</el-radio-button>
      </el-radio-group>
    </page-header>

    <iframe class="iframe" :src="src" frameborder="0" />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import useOfficeSrc from '@/hooks/useOfficeSrc'
const radioValue = ref('word')
const list = {
  word: 'ele+newsletter.docx',
  excel: 'Electronic gradebook template1.xlsx',
  ppt: 'K.3Class Rules.pptx',
}
const src = computed(() => useOfficeSrc(`newteach.pbworks.com/f/${list[radioValue.value]}`))
</script>
<style lang="scss" scoped>
.online-preview {
  display: flex;
  height: 100%;

  .iframe {
    flex: 1;
  }
}
</style>
