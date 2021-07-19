<template>
  <iframe :src="link" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" />
</template>

<script setup>
import { useRoute } from 'vue-router'
const link = useRoute().meta?.link
</script>

<style lang="scss" scoped>
iframe {
  border: 1px solid #eee;
  width: 100%;
  height: 100%;
}
</style>
