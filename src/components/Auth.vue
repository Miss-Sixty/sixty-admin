<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script>
export default {
  name: 'Auth',
}
</script>

<script setup>
import { useAuth } from '@/hooks/useAuth'
const props = defineProps({
  value: {
    type: [String, Array],
    default: '',
  },
})
const check = () => useAuth(props.value)
</script>
