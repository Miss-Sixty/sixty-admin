<template>
  <router-link v-slot="{ navigate }" custom to="/">
    <div
      :class="{
        'logo--shadow': props.isScrollTop,
      }"
      class="logo"
      @click="navigate"
    >
      {{ title }}
    </div>
  </router-link>
</template>

<script setup>
import { useStore } from 'vuex'
import { defineProps } from 'vue'

const props = defineProps({
  isScrollTop: Boolean,
})
const title = useStore().state.setting.title
</script>

<style lang="scss" scoped>
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
  font-size: 16px;
  transition: box-shadow 0.2s;

  &--shadow {
    box-shadow: 0 10px 10px -10px #c7c7c7;
  }
}
</style>
