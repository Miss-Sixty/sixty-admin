<template>
  <div>
    <search-bar v-model:keywords="tableQuery.keywords" search-btn style="margin: 20px;" @on-search="getListData" @on-reset="onResetChange">
      <el-select v-model="tableQuery.status" clearable placeholder="筛选 禁用/启用">
        <el-option label="禁用" :value="0" />
        <el-option label="启用" :value="1" />
      </el-select>
    </search-bar>
    <page-main style="margin: 20px;" :header-border="false" padding="0 20px">
      <template #header>
        <el-row justify="space-between" align="middle">
          <span style="font-size: 18px;">列表</span>
          <el-row align="middle">
            <el-button size="small" :icon="Plus" type="primary" @click="onCreateChange"> 新 增 </el-button>
            <refresh-button content="刷新表格数据" @click="getListData" />
          </el-row>
        </el-row>
      </template>

      <el-table v-loading="tableLoading" :data="tableList">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="姓名" min-width="160" align="center" />
        <!-- <el-table-column prop="address" label="禁用/启用" min-width="160" align="center">
          <template #default="{ row }">
            <confirm-switch
              :id="row.id"
              :api="statusApi"
              :text="`确定要「${row.status ? '禁用' : '启用'}」该数据吗？`"
              :status="row.status"
              @on-success="row.status = !row.status"
            />
          </template>
        </el-table-column> -->
        <el-table-column prop="address" label="地址" min-width="260" />
        <el-table-column prop="date" label="日期" min-width="180" align="center" />

        <el-table-column prop="address" label="操作" align="center" min-width="140" fixed="right">
          <template #default="{ row, $index }">
            <el-button
              :disabled="row.disabled"
              type="warning"
              size="small"
              :icon="Edit"
              @click="onEditChange"
            />

            <el-button
              :loading="row.disabled"
              type="danger"
              size="small"
              :icon="Delete"
              @click="onDelListData(row, $index)"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model:page-size="paginate.page_size" v-model:current-page="paginate.current_page" :total="paginate.total" @on-change="getListData" />
    </page-main>
    <FormDialog v-model="dialogVisible" :props="modeData" />
    <FormDrawer v-model="drawerVisible" :props="dadd" />
  </div>
</template>
<script setup>
import { listApi, delApi 
// statusApi 
} from '@/api/list'
import { reactive  } from 'vue'
import useListDelData from '@/hooks/useListDelData'
import useListData from '@/hooks/useListData'
import useSearch from '@/hooks/useSearch'
import useViewMode from '@/hooks/useViewMode'
import { Edit, Delete, Plus } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import FormDialog from './components/FormDialog/index.vue'
import FormDrawer from './components/FormDrawer/index.vue'
const router  = useRouter()
const tableQuery = reactive({
  keywords: null,
  status: null
})

/**
 * 详情展示模式
 * router 路由跳转
 * dialog 对话框
 * drawer 抽屉
 */
const { visible: dialogVisible, onChange: onCreateChange, modeData } = useViewMode('drawer', '新增演示', 'ListCreate')
const { visible: drawerVisible, onChange: onEditChange, modeData: dadd } = useViewMode('drawer', '修改演示', 'ListEdit')

/**
 * 详情展示模式
 * router 路由跳转
 * dialog 对话框
 * drawer 抽屉
 */
// const modeData = reactive({
//   mode: 'drawer', 
//   dialogVisible: false,
//   drawerVisible: false,
//   props: { id: '' }
// })

// function onCreateChange() {
//   if (modeData.mode === 'router') return router.push({
//     name: 'ListCreate'
//   })
//   modeData.props = {
//     id: '',
//     title: '新增演示'
//   }
//   modeData[`${[modeData.mode]}Visible`] = true
// }

// function onEditChange(row) {
//   if (modeData.mode === 'router') {
//     return router.push({
//       name: 'ListEdit',
//       params: {
//         id: row.id
//       }
//     })
//   }
//   modeData.props = {
//     id: '',
//     title: '编辑演示'
//   }
//   modeData[`${[modeData.mode]}Visible`] = true
// }

/**
 * 获取列表数据
 * @param {function} api 请求列表api
 * @param {object} props{} tableQuery 请求列表api参数
 * @param {object} props{} fetch_all 是否分页
 * @return {function} getListData 请求事件
 * @return {array} list 列表数据
 * @return {function} paginate 分页数据
 * @return {boolean} loading 是否请求中
 */
const { getListData, list: tableList, paginate, loading: tableLoading } = useListData(listApi, { tableQuery })
getListData()

/**
   * 删除列表数据
   * @param {function} api 请求列表api
   * @param {object} tableList 列表数据
   *
   * @return {function} 删除请求事件
   * @param {object} row 待删除row数据
   * @param {number} index 待删除数据下标
   */
const onDelListData = useListDelData(delApi, tableList)

/**
 * 搜索
 * @param {function} api 请求列表api
 * @param {object} tableQuery 请求列表api参数
 * @return {function} onResetChange 清空搜索参数并请求列表
 */
const onResetChange = useSearch(getListData, tableQuery, ['departure'])
</script>
