<template>
  <div>
    <page-header no-icon title="文本复制">
      使用的是 VueUse 函数库中的
      <el-link type="primary" href="https://vueuse.org/core/useClipboard/#type-declarations" target="_blank"> useClipboard </el-link>
      函数
    </page-header>
    <el-alert title="选中文字右键点击复制或键盘快捷键复制后，即可读取到复制内容" type="warning" effect="dark" show-icon />

    <page-main style="margin: 20px">
      <el-tag style="margin-right: 10px" type="info">是否支持剪切板功能：{{ isSupported }}</el-tag>
      <el-tag style="margin-right: 10px" type="info">剪切板读权限：{{ permissionRead }}</el-tag>
      <el-tag style="margin-bottom: 10px" type="info">剪切板写权限：{{ permissionWrite }}</el-tag>
      <p>
        <el-alert :title="`当前复制内容：${text || 'none'}`" type="success" :closable="false" />
      </p>
    </page-main>

    <page-main style="margin: 20px">
      <p>这是一段供您复制的文字，选中文字后点击右键选择“复制”或按键盘上 Command + C（windows：Ctrl + C） 即可复制选中文字。</p>
      <p>此时浏览器会询问是否授权本网站读取剪切板信息，允许后上方便会显示您所复制的具体内容。</p>
      <el-input style="margin: 50px 0 10px" v-model="input" placeholder="请输入内容" />
      <el-button type="primary" @click="handleCopy"> 复制输入框文字 </el-button>
    </page-main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useClipboard, usePermission } from '@vueuse/core'
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')
const input = ref('连雨不知春去，一晴方觉夏深。')
const { text, copy, isSupported } = useClipboard()

const handleCopy = () => {
  try {
    copy(input.value)
    ElMessage.success('复制成功！')
  } catch (err) {
    ElMessage.error('复制失败！')
  }
}
</script>
