<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script>
import { authAll } from "@/utils";

export default {
  name: "AuthAll",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const check = () => authAll(props.value);

    return {
      check,
    };
  },
};
</script>
