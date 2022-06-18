<script setup name="Auth">
import { useAuth } from '@/hooks/useAuth'
const props = defineProps({
  value: {
    type: [String, Array],
    default: '',
  },
})

const check = computed(() => useAuth(props.value))
</script>

<template>
  <div>
    <slot v-if="check" />
    <slot v-else name="no-auth" />
  </div>
</template>
