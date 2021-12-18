<template>
  <div>
    <page-header no-icon title="数字过渡">
      基于
      <el-link type="primary" href="https://github.com/inorganik/CountUp.js" target="_blank"> CountUp.js </el-link>
      的二次封装。更多配置请参考官方文档。
    </page-header>

    <page-main style="margin: 20px">
      <count-up
        ref="countUpDom"
        class="countUp"
        :start-val="state.startVal"
        :end-val="state.endVal"
        :decimal-places="state.decimalPlaces"
        :duration="state.duration"
        :use-grouping="state.useGrouping"
        :separator="state.separator"
        :prefix="state.prefix"
        :suffix="state.suffix"
      />

      <el-form :model="state" label-width="90px" inline>
        <el-form-item label="开始数字">
          <el-input v-model.number="state.startVal" />
        </el-form-item>
        <el-form-item label="结束数字">
          <el-input v-model.number="state.endVal" />
        </el-form-item>
        <el-form-item label="过渡时间">
          <el-input v-model.number="state.duration" />
        </el-form-item>
        <el-form-item label="小数点位数">
          <el-input v-model.number="state.decimalPlaces" />
        </el-form-item>
        <el-form-item label="分隔符">
          <el-input v-model="state.separator" />
        </el-form-item>
        <el-form-item label="首部内容">
          <el-input v-model="state.prefix" />
        </el-form-item>
        <el-form-item label="尾部内容">
          <el-input v-model="state.suffix" />
        </el-form-item>
      </el-form>

      <el-alert
        :closable="false"
        :title="`<count-up
      :start-val='${state.startVal}'
      :end-val='${state.endVal}'
      :decimal-places='${state.decimalPlaces}'
      :duration='${state.duration}'
      :use-grouping='${state.useGrouping}'
      :separator='${state.separator}'
      :prefix='${state.prefix}'
      :suffix='${state.suffix}'
    />`"
        type="info"
      />

      <el-row justify="center" style="margin: 20px 0">
        <el-button-group>
          <el-button type="primary" @click="start">开始</el-button>
          <el-button type="primary" @click="pauseResume">暂停/继续</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-button-group>

        <el-button-group style="margin-left: 20px">
          <el-button type="primary" @click="update">更新到指定数字</el-button>
          <el-input-number v-model="state.number" label="请输入更新数字" />
        </el-button-group>
      </el-row>
    </page-main>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const countUpDom = ref(null)

const state = reactive({
  number: 1995,
  startVal: 0,
  endVal: 2021,
  decimalPlaces: 2,
  duration: 3,
  useGrouping: true,
  separator: ',',
  prefix: '¥ ',
  suffix: ' rmb',
})

const start = () => {
  countUpDom.value.start()
}

const pauseResume = () => {
  countUpDom.value.pauseResume()
}

const reset = () => {
  countUpDom.value.reset()
}

const update = () => {
  countUpDom.value.update(state.number)
}
</script>

<style scoped>
.countUp {
  color: #f6416c;
  display: block;
  margin-bottom: 20px;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}
</style>
