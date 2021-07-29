<template>
  <div class="online-preview">
    <page-header icon="none" icon-text="none" title="预览 office 文件">
      <div class="title">
        <span> 可以在线查看 Word、Excel、PowerPoint 文件</span>
        <el-radio-group v-model="radioValue">
          <el-radio-button label="word">文字 Word</el-radio-button>
          <el-radio-button label="excel">表格 Excel</el-radio-button>
          <el-radio-button label="ppt">演示 PowerPoint</el-radio-button>
        </el-radio-group>
      </div>
    </page-header>

    <iframe class="iframe" :src="src" frameborder="0" />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { officeSrc } from '@/hooks'
const radioValue = ref('word')
const list = {
  word: 'ele+newsletter.docx',
  excel: 'Electronic gradebook template1.xlsx',
  ppt: 'K.3Class Rules.pptx',
}
const src = computed(() => officeSrc(`newteach.pbworks.com/f/${list[radioValue.value]}`))
</script>
<style lang="scss" scoped>
.online-preview {
  display: flex;
  flex-direction: column;
  height: 100%;
  .title span {
    margin-right: 50px;
  }
  .iframe {
    flex: 1;
  }
}
</style>
