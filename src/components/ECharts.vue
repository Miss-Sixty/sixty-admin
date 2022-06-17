<template>
  <div ref="charts" :style="styles"></div>
</template>

<script setup name="ECharts">
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
import { LineChart, BarChart, PieChart, ScatterChart, CandlestickChart, RadarChart, SunburstChart, GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useWindowSize } from '@vueuse/core'
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  BarChart,
  PieChart,
  TooltipComponent,
  ScatterChart,
  CandlestickChart,
  RadarChart,
  SunburstChart,
  GaugeChart,
  TitleComponent,
  LegendComponent,
])
const props = defineProps({
  height: {
    type: String,
    default: '350px',
  },
  width: {
    type: String,
    default: '100%',
  },
  option: {
    type: Object,
    default: () => {},
  },
  deepWatch: {
    type: Boolean,
    default: false,
  },
  loading: Boolean,
})
const { width, height } = useWindowSize()
const charts = ref()
let myChart
const styles = computed(() => ({
  height: props.height,
  width: props.width,
}))
function init() {
  myChart = echarts.init(charts.value)
  myChart.setOption(props.option)
}
watch([width, height], () =>
  myChart.resize({
    animation: {
      duration: 200,
    },
  })
)
watch(
  () => props.loading,
  () => {
    if (props.loading) myChart.showLoading()
    if (!props.loading) myChart.hideLoading()
  }
)
// 深度监听 options 改动，改动后重绘数据
if (props.deepWatch) {
  watch(
    () => props.option,
    (option) => myChart.setOption(option),
    { deep: true }
  )
} else {
  //INFO：如果想要不深度监听，则须在图表数据改变后重新赋值options来达到重新渲染图表的目的，比深度监听性能更高。
  watch(
    () => props.option,
    (option) => myChart.setOption(option)
  )
}
onMounted(init)
//销毁echarts
onBeforeUnmount(() => {
  myChart.dispose()
  myChart = null
})
</script>
