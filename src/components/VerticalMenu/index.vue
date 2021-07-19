<template>
  <ul class="vertical-menu">
    <li
      v-for="item in list"
      :key="item.type"
      class="vertical-menu__item"
      :class="{ 'vertical-menu__item--active': item.type === modelValue }"
      @click="clickChange(item)"
    >
      <svg-icon :name="item.icon" />
      {{ item.title }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'VerticalMenu',
  props: {
    list: Array,
    modelValue: [String, Number],
  },
  emits: ['update:modelValue', 'on-change'],
  setup(props, { emit }) {
    const clickChange = item => {
      emit('update:modelValue', item.type)
      emit('on-change', item.type)
    }
    return {
      clickChange,
    }
  },
}
</script>
<style lang="scss" scoped>
.vertical-menu {
  font-size: 14px;
  &__item {
    padding: 12px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 8px;
    transition-property: background-color, box-shadow, color;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #409eff;
      box-shadow: 0 4px 18px -4px #56a6f7;
      color: #fff;
    }
    &--active {
      background-color: #409eff;
      box-shadow: 0 4px 18px -4px #56a6f7;
      color: #fff;
    }

    .svg-icon {
      font-size: 18px;
      margin-right: 8px;
    }
  }
}
</style>
