import lang from "element-plus/lib/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
locale(lang);
import {
  locale,
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
} from "element-plus";

export default (app) => {
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
    .use(ElRow);
};