<template>
  <teleport :to="props.to">
    <div ref="watermark">
      <slot />
      <div class="watermark" :style="{ 'z-index': props.zIndex }" />
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
const watermark = ref(null)
const props = defineProps({
  width: {
    type: [String, Number],
    default: 120,
  },
  height: {
    type: [String, Number],
    default: 64,
  },
  rotate: {
    type: [String, Number],
    default: -22,
  },
  image: String,
  content: String,
  fontColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.15)',
  },
  fontSize: {
    type: [String, Number],
    default: 16,
  },
  zIndex: {
    type: [Number, String],
    default: 9,
  },
  offsetLeft: String,
  offsetTop: String,
  fontWeight: String,
  markSize: String,
  markHeight: String,
  fontFamily: String,
})

const init = () => {
  const { gapX, gapY, width, height, rotate, offsetLeft, offsetTop, fontSize, fontStyle, fontWeight, markHeight, fontFamily, image } =
    props

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const canvasWidth = ''.concat(gapX + width, 'px')
  const canvasHeight = ''.concat(gapY + height, 'px')
  const canvasOffsetLeft = offsetLeft || gapX / 2
  const canvasOffsetTop = offsetTop || gapY / 2
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)
  if (!ctx) return console.error('当前环境不支持Canvas')
  // 旋转字符 rotate
  ctx.translate(canvasOffsetLeft, canvasOffsetTop)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  if (image) {
    let img = new Image()
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'
    img.src = image
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      // setBase64Url(canvas.toDataURL())
    }
  } else if (props.content) {
    let markSize = Number(fontSize)
    ctx.font = ''
      .concat(fontStyle, ' normal ')
      .concat(fontWeight, ' ')
      .concat(markSize, 'px/')
      .concat(markHeight, 'px ')
      .concat(fontFamily)
    ctx.fillStyle = props.fontColor
    ctx.fillText(props.content, 0, 0)
    // setBase64Url(canvas.toDataURL())
  }
  //   ctx.fillText('张三丰 2021.07.23 14:22', canvas.width / 2, canvas.height - 26) // 水印在画布的位置x，y轴
  //   const src = canvas.toDataURL('image/png')
  //   watermark.value.style.backgroundImage = 'URL(' + src + ')'
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.watermark {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  //   background-color: red;
  pointer-events: none;
}
</style>
