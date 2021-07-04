<template>
  <div />
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    onMounted(async () => {
      router.go(-1);
    });
  },
};
</script>
