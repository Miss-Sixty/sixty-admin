import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import {
  ElButton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTooltip,
  ElPopover,
  ElTabPane,
  ElTabs,
  ElBadge,
  ElEmpty,
  ElAvatar,
  ElDropdownItem,
  ElDropdownMenu,
  ElDropdown,
  ElMenuItem,
  ElSubmenu,
  ElMenu,
  ElInput,
  ElFormItem,
  ElForm,
  ElRow,
  ElScrollbar,
  ElBacktop,
  ElTableColumn,
  ElTable,
  ElRadioButton,
  ElRadioGroup,
  ElTag,
  ElButtonGroup,
  ElLoading,
  ElCol,
  ElCard,
  ElOption,
  ElSelect,
  ElAffix,
  ElSwitch,
  ElPagination,
  ElSpace,
} from 'element-plus'

export default app => {
  locale.use(lang)
  app
    .use(ElButton)
    .use(ElBreadcrumb)
    .use(ElBreadcrumbItem)
    .use(ElTooltip)
    .use(ElPopover)
    .use(ElTabPane)
    .use(ElTabs)
    .use(ElBadge)
    .use(ElEmpty)
    .use(ElAvatar)
    .use(ElDropdownItem)
    .use(ElDropdownMenu)
    .use(ElDropdown)
    .use(ElMenuItem)
    .use(ElSubmenu)
    .use(ElMenu)
    .use(ElInput)
    .use(ElFormItem)
    .use(ElForm)
    .use(ElScrollbar)
    .use(ElBacktop)
    .use(ElTableColumn)
    .use(ElTable)
    .use(ElRadioButton)
    .use(ElRadioGroup)
    .use(ElTag)
    .use(ElButtonGroup)
    .use(ElLoading)
    .use(ElRow)
    .use(ElCard)
    .use(ElSelect)
    .use(ElOption)
    .use(ElAffix)
    .use(ElSwitch)
    .use(ElPagination)
    .use(ElSpace)
    .use(ElCol)
}
