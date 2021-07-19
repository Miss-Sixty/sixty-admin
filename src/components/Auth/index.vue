<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script>
import { auth } from '@/utils'

export default {
  name: 'Auth',
  props: {
    value: {
      type: [String, Array],
      default: '',
    },
  },
  setup(props) {
    const check = () => auth(props.value)

    return {
      check,
    }
  },
}
</script>
