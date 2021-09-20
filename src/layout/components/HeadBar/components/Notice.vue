<template>
  <el-popover trigger="hover" placement="bottom" :width="300">
    <template #reference>
      <el-icon role="button" class="header-icon">
        <el-badge :value="props.notice.num" :hidden="!props.notice.num" type="danger">
          <notification-2-line />
        </el-badge>
      </el-icon>
    </template>
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane v-for="item in props.notice.list" :key="item.name" :name="item.name">
        <template #label>
          <el-badge :value="item.num" :hidden="item.num < 1" type="danger" class="pane--badge">
            {{ item.title }}
          </el-badge>
        </template>
        <el-scrollbar height="300px">
          <ul v-if="item.list.length">
            <li v-for="list in item.list" :key="list.id">{{ list.text }}</li>
          </ul>

          <el-empty v-else description="无新的通知" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>
<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  notice: Object,
})
const activeName = ref('0')
</script>
<style lang="scss" scoped>
.pane--badge :deep(.el-badge__content) {
  top: 10px;
  right: 6px;
}
</style>
