<template>
  <el-popover trigger="click" placement="bottom" :width="320">
    <template #reference>
      <el-badge :value="props.notice.num" :hidden="!props.notice.num" type="danger">
        <el-icon :size="18" class="bg">
          <Bell />
        </el-icon>
      </el-badge>
    </template>
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane v-for="item in props.notice.list" :key="item.name" :name="item.name">
        <template #label>
          <el-badge :value="item.num" :hidden="item.num < 1" type="danger" class="pane--badge">
            {{ item.title }}
          </el-badge>
        </template>
        <div class="content">
          <el-scrollbar style="flex: 1">
            <ul v-if="item.list.length">
              <li v-for="list in item.list" :key="list.id" class="item" @click="handleNavigate">
                <el-icon :size="24" :style="{ 'background-color': list.color }" class="item__icon">
                  <component :is="list.icon" />
                </el-icon>
                <div class="item__text">
                  <p class="item__text__title">{{ list.text }}</p>
                  <p class="item__text__time">{{ list.time }}</p>
                </div>
              </li>
            </ul>
            <el-empty v-else description="无新的内容" />
          </el-scrollbar>
          <el-button v-show="activeName === '0'" @click="handleNavigate">进入通知公告</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bell } from '@element-plus/icons-vue'
const router = useRouter()
const props = defineProps({
  notice: Object,
})
const activeName = ref('0')
const handleNavigate = () => {
  router.push({ name: 'Notice' })
}
</script>
<style lang="scss" scoped>
.pane--badge :deep(.el-badge__content) {
  top: 10px;
  right: 6px;
}
.content {
  height: 300px;
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    transition: background-color 0.3s;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    &:not(:last-child) {
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border-bottom: 1px solid var(--el-border-color-base);
        transform: scale(0.5);
      }
    }
    &:hover {
      background-color: #ecf5ff;
    }
    &__icon {
      border-radius: 50%;
      padding: 10px;
      box-sizing: content-box;
      margin-right: 10px;
    }
    &__text {
      flex: 1;
      p {
        margin: 0;
      }
      &__title {
        font-size: 14px;
        @include text-overflow(2);
      }
      &__time {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
