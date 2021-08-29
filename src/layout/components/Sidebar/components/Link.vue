<template>
  <router-link v-if="isExternal" :to="to">
    <slot />
  </router-link>
  <a v-else :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})
const isExternal = () => /^(https?:|mailto:|tel:)/.test(props.to)
</script>
