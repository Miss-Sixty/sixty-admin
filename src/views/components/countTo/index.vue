<template>
  <div>
    <page-header icon="none" icon-text="none" title="数字过渡">
      基于
      <el-link type="primary" href="https://github.com/PanJiaChen/vue-countTo" target="_blank"> vue-countTo </el-link>
      的二次封装。兼容 vue3 的代码来源于
      <el-link type="primary" href="https://github.com/xiaofan9/vue-count-to" target="_blank"> xiaofan9 </el-link>
    </page-header>
    <div class="page-main">
      <count-to
        ref="example"
        :start-val="_startVal"
        :end-val="_endVal"
        :duration="_duration"
        :decimals="_decimals"
        :separator="_separator"
        :prefix="_prefix"
        :suffix="_suffix"
        :autoplay="false"
        class="example"
      />

      <el-form :model="state" label-width="80px" inline>
        <el-form-item label="startVal">
          <el-input v-model.number="state.setStartVal" />
        </el-form-item>
        <el-form-item label="endVal">
          <el-input v-model.number="state.setEndVal" />
        </el-form-item>
        <el-form-item label="duration">
          <el-input v-model.number="state.setDuration" />
        </el-form-item>
        <el-form-item label="decimals">
          <el-input v-model.number="state.setDecimals" />
        </el-form-item>
        <el-form-item label="separator">
          <el-input v-model="state.setSeparator" />
        </el-form-item>
        <el-form-item label="prefix">
          <el-input v-model="state.setPrefix" />
        </el-form-item>
        <el-form-item label="suffix">
          <el-input v-model="state.setSuffix" />
        </el-form-item>
        <el-form-item label="操作">
          <el-button-group>
            <el-button type="primary" @click="start">开始</el-button>
            <el-button type="primary" @click="pauseResume">暂停/继续</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>

      <el-alert
        :closable="false"
        :title="`<count-to :start-val='${_startVal}' :end-val='${_endVal}' :duration='${_duration}' :decimals='${_decimals}' separator='${_separator}' prefix='${_prefix}' suffix='${_suffix}' />`"
        type="info"
      />
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref } from 'vue'
const state = reactive({
  setStartVal: 0,
  setEndVal: 2021,
  setDuration: 3000,
  setDecimals: 2,
  setSeparator: ',',
  setSuffix: ' rmb',
  setPrefix: '¥ ',
})
const example = ref()

const _startVal = computed(() => state.setStartVal || 0)
const _endVal = computed(() => state.setEndVal || 0)
const _duration = computed(() => state.setDuration || 100)
const _decimals = computed(() => {
  if (state.setDecimals) {
    if (state.setDecimals < 0 || state.setDecimals > 20) {
      alert('digits argument must be between 0 and 20')
      return 0
    }
    return state.setDecimals
  } else {
    return 0
  }
})
const _separator = computed(() => state.setSeparator)
const _suffix = computed(() => state.setSuffix)
const _prefix = computed(() => state.setPrefix)

function start() {
  example.value.start()
}
function pauseResume() {
  example.value.pauseResume()
}
</script>

<style scoped>
.example {
  color: #f6416c;
  display: block;
  margin-bottom: 20px;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}
</style>
