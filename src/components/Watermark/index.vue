<template>
  <div class="watermark">
    <slot />
    <div :class="{ markClassName }" :style="svgStyle" />
  </div>
</template>
<script>
export default {
  name: 'Watermark',
}
</script>
<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
const props = defineProps({
  /** 水印样式 */
  markStyle: String,
  /** 水印类名 */
  markClassName: String,
  /** 水印之间的水平间距 */
  gapX: {
    type: [Number, String],
    default: 212,
  },
  /** 水印之间的垂直间距 */
  gapY: {
    type: [Number, String],
    default: 222,
  },
  /** 追加的水印元素的z-index */
  zIndex: {
    type: [Number, String],
    default: 9,
  },
  /** 水印的宽度 */
  width: {
    type: [String, Number],
    default: 120,
  },
  /** 水印的高度 */
  height: {
    type: [String, Number],
    default: 64,
  },
  /** 水印在canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 offsetTop = gapY / 2 */
  offsetTop: Number, // 水印图片距离绘制 canvas 单元的顶部距离
  /** 水印在canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 offsetTop = gapX / 2 */
  offsetLeft: Number,
  /** 水印绘制时，旋转的角度，单位 ° */
  rotate: {
    type: [String, Number],
    default: -22,
  },
  /** 高清印图片源, 为了高清屏幕显示，建议使用 2倍或3倍图，优先使用图片渲染水印。 */
  image: String,
  /** 水印文字内容 */
  content: {
    type: String,
    default: 'Sixty-Admin',
  },
  /** 文字颜色 */
  fontColor: {
    type: String,
    default: 'rgba(0,0,0,.15)',
  },
  /** 文字样式 */
  fontStyle: {
    type: String,
    default: 'normal',
  },
  /** 文字族 */
  fontFamily: String,
  /** 文字粗细 */
  fontWeight: {
    type: String,
    default: 'normal',
  },
  /** 文字大小 */
  fontSize: {
    type: [String, Number],
    default: 16,
  },
})
const base64Url = ref('')
const svgStyle = computed(() => ({
  'z-index': props.zIndex,
  ...props.markStyle,
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundSize: `${Number(props.gapX) + Number(props.width)}px`,
  pointerEvents: 'none',
  backgroundRepeat: 'repeat',
  backgroundImage: `url('${base64Url.value}')`,
}))

const init = () => {
  const {
    gapX,
    gapY,
    width,
    height,
    rotate,
    offsetLeft,
    offsetTop,
    fontSize,
    fontStyle,
    fontWeight,
    fontFamily,
    image,
    fontColor,
    content,
  } = props

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const canvasWidth = `${Number(gapX) + Number(width)}px`
  const canvasHeight = `${Number(gapY) + Number(height)}px`
  const canvasOffsetLeft = offsetLeft || Number(gapX) / 2
  const canvasOffsetTop = offsetTop || Number(gapY) / 2
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)

  if (!ctx) return console.error('当前环境不支持Canvas')
  ctx.translate(canvasOffsetLeft, canvasOffsetTop)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  if (image) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'
    img.src = image
    img.onload = () => {
      ctx.drawImage(img, 0, 0, Number(width), Number(height))
      base64Url.value = canvas.toDataURL()
    }
  } else if (content) {
    let markSize = Number(fontSize)
    ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${Number(height)}px ${fontFamily}`
    ctx.fillStyle = fontColor
    ctx.fillText(content, 0, 0)
    base64Url.value = canvas.toDataURL()
  }
}
onMounted(() => init())
</script>

<style lang="scss" scoped>
.watermark {
  position: relative;
}
</style>
