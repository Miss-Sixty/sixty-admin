<template>
  <iframe
    :src="link"
    scrolling="no"
    border="0"
    frameborder="no"
    framespacing="0"
    allowfullscreen="true"
  />
</template>
<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    return {
      link: route.meta?.link,
    };
  },
};
</script>
<style lang="scss" scoped>
iframe {
  border: 1px solid #eee;
  width: 100%;
  height: 100%;
}
</style>
