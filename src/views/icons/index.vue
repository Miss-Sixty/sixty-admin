<template>
  <div>
    <page-header
      title="SVG Icon"
      content="除了使用 element-plus 提供的图标外，你还可以使用自己的 SVG 图标"
    />
    <div class="grid">
      <template v-for="item in svgIcons" :key="item">
        <div class="icon-item">
          <svg-icon :name="item" />
          <span>{{ item }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import svgIcons from "./svg-icons";
import PageHeader from "@/components/PageHeader";
export default {
  components: { PageHeader },
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
