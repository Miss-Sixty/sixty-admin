<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script>
export default {
  name: 'AuthAll',
}
</script>

<script setup>
import { useAuthAll } from '@/hooks/useAuth'

const props = defineProps({
  value: {
    type: [String, Array],
    default: '',
  },
})

const check = () => useAuthAll(props.value)
</script>
