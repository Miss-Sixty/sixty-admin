<template>
  <svg :class="className" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: String,
    className: {
      type: String,
      default: "svg-icon",
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
