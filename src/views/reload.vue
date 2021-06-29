<template>
  <div />
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    onMounted(() => {
      setTimeout(() => {
        router.go(-1);
      }, 3000);
    });
  },
};
</script>
