<template>
  <router-link v-slot="{ navigate }" custom to="/">
    <div
      :class="{
        shadow: scrollTop,
        'logo--isScrollTop': isScrollTop,
      }"
      class="logo"
      @click="navigate"
    >
      {{ title }}
    </div>
  </router-link>
</template>
<script>
import { useStore } from "vuex";
export default {
  props: {
    isScrollTop: Boolean,
  },
  setup() {
    const store = useStore();
    return { title: store.state.setting.title };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/mixins";

.logo {
  min-height: $headbar-height;
  line-height: $headbar-height;
  text-align: center;
  color: #37414b;
  overflow: hidden;
  text-decoration: none;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
  @include text-overflow;
  background: $g-sub-sidebar-logo-bg;
  position: relative;
  z-index: 1;

  &--isScrollTop {
    box-shadow: 0 10px 10px -8px #c7c7c7;
  }
}
</style>
