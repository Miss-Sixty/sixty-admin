<template>
  <el-tooltip :disabled="!$attrs.content" v-bind="$attrs">
    <el-icon
      role="button"
      class="icon"
      :style="{ padding }"
      @click="$emit('click', $event)"
    >
      <component :is="name" />
    </el-icon>
  </el-tooltip>
</template>

<script setup>
defineProps({
  name: [String, Object],
  padding: {
    type: String,
    default: "0 10px",
  },
  click: Function,
});

defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.icon {
  box-sizing: content-box;
  height: $headbar-height;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>
