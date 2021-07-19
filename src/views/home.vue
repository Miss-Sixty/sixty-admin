<template>
  <el-row type="flex" align="middle" class="page-main">
    <el-avatar :size="60" :src="userInfo.avatar" />
    <div class="content">
      <h3 class="content__title">{{ content.title }} {{ userInfo.name }}，{{ content.text }}</h3>
      <p>{{ userInfo.jobTitle }} {{ userInfo.company }}</p>
    </div>
  </el-row>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.user.userInfo)
    const content = computed(() => {
      const hour = new Date().getHours()
      let status = hour < 6 ? 0 : hour <= 9 ? 1 : hour <= 11 ? 2 : hour < 13 ? 3 : hour < 17 ? 4 : hour < 19 ? 5 : hour < 24 ? 6 : 7
      const textMap = [
        {
          title: '凌晨了',
          text: ['要适当休息哦～身体最重要！'],
        },
        {
          title: '早晨好',
          text: ['这么早就开始工作了，以后会越来越好吧！'],
        },
        {
          title: '上午好',
          text: ['祝您开心每一天！'],
        },
        {
          title: '中午好',
          text: ['记得睡个午觉哦～下午精神满满！'],
        },
        {
          title: '下午好',
          text: ['祝您开心每一天！'],
        },
        {
          title: '傍晚了',
          text: ['还没下班吗？加油加油！！'],
        },
        {
          title: '晚上了',
          text: ['这么晚了还在工作，偶尔起来走走也许效率会更高哦～'],
        },
      ]
      return { ...textMap[status], text: textMap[status].text[Math.floor(Math.random() * textMap[status].text.length)] }
    })
    return {
      userInfo,
      content,
    }
  },
}
</script>
<style lang="scss" scoped>
.content {
  margin-left: 20px;
  flex: 1;
  &__title {
    margin: 0 0 10px 0;
    font-size: 20px;
    font-weight: 700;
    color: #3c4a54;
  }
  p {
    font-size: 14px;
    color: rgb(81, 90, 110);
    margin: 0;
  }
}
</style>
