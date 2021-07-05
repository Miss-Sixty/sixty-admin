<template>
  <div>
    <page-header
      title="SVG Icon"
      content="你也可以使用自己的 SVG 图标，只需把 svg 图标复制到 @/icons/svg 文件夹下即可。"
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
import { svgIcons } from "./svg-icons";
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
    margin: 15px;
    text-align: center;
    font-size: 30px;

    span {
      display: block;
      font-size: 14px;
      margin-top: 4px;
    }
  }
}
</style>
