<template>
  <router-link v-slot="{ navigate }" custom to="/">
    <div
      :class="{
        shadow: scrollTop,
      }"
      class="logo"
      @click="navigate"
    >
      {{ setting.title }}
    </div>
  </router-link>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import setting from "@/setting";
export default {
  setup() {
    const scrollTop = ref(0);
    const onScroll = () => {
      scrollTop.value =
        document.documentElement.scrollTop || document.body.scrollTop;
    };

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", onScroll);
    });

    return { scrollTop, setting };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/mixins";

.logo {
  height: $headbar-height;
  line-height: $headbar-height;
  text-align: center;
  color: #37414b;
  overflow: hidden;
  text-decoration: none;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
  @include text-overflow;
  //   box-shadow: 0 0 1px 0 #ccc;
  background: #fafafa;
}
</style>
