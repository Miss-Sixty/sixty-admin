<template>
  <div class="grid">
    <template v-for="item in svgIcons" :key="item">
      <div class="icon-item">
        <svg-icon :name="item" />
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>
<script>
import svgIcons from "./svg-icons";
export default {
  setup() {
    return {
      svgIcons,
    };
  },
};
</script>
<style lang="scss" scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

  .icon-item {
    margin: 20px;
    text-align: center;
    font-size: 30px;

    span {
      display: block;
      font-size: 14px;
      margin-top: 6px;
    }
  }
}
</style>
