<template>
  <div>
    <page-header :title="$route.meta.title" @click="backChange" />
    <page-main style="margin: 20px;">
      <DetailForm ref="formRef" v-loading="state.loading" />
      <fixed-action-bar style="text-align: center;">
        <el-button @click="backChange">取消</el-button>
        <el-button type="primary" @click="onSubmitChange">确 认</el-button>
      </fixed-action-bar>
    </page-main>
  </div>
</template>
<script setup>
import DetailForm from './components/DetailForm/index.vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
const router  = useRouter()
const backChange = () => {
  router.push({ name: 'List' })
}

const state = reactive({
  loading: false
})

const onSubmitChange = () => {
  console.log('onSubmitChange')
}
</script>
