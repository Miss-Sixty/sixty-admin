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
  line-height: $headbar-height;
  text-align: center;
  color: #37414b;
  text-decoration: none;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
  background-color: $navmenu-logo-bg;
  font-size: 16px;
  transition: box-shadow 0.2s;
  &--shadow {
    box-shadow: 0 10px 10px -10px #c7c7c7;
  }
  @include text-overflow;
}
</style>
