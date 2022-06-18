<script setup name="AuthAll">
import { useAuthAll } from '@/hooks/useAuth'
const props = defineProps({
  value: {
    type: [String, Array],
    default: '',
  },
})

const check = computed(() => useAuthAll(props.value))
</script>

<template>
  <div>
    <slot v-if="check" />
    <slot v-else name="no-auth" />
  </div>
</template>
