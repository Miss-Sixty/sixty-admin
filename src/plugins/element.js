import lang from "element-plus/lib/locale/lang/zh-cn";
import locale from "element-plus/lib/locale";
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
} from "element-plus";

export default (app) => {
  locale.use(lang);
  app.use(ElButton);
  app.use(ElBreadcrumb);
  app.use(ElBreadcrumbItem);
  app.use(ElTooltip);
  app.use(ElPopover);
  app.use(ElTabPane);
  app.use(ElTabs);
  app.use(ElBadge);
  app.use(ElEmpty);
  app.use(ElAvatar);
  app.use(ElDropdownItem);
  app.use(ElDropdownMenu);
  app.use(ElDropdown);
  app.use(ElMenuItem);
  app.use(ElSubmenu);
  app.use(ElMenu);
};
