/**
 * 全局组件自动注册
 *
 * 普通组件必须设置 name 并保证其唯一，自动注册会将组件的 name 设为组件名
 */

export default function registerGlobalComponent(app) {
  const componentsContext = import.meta.globEager('./**.vue')
  for (const path in componentsContext) {
    const component = componentsContext[path].default
    console.log(component.name)
    app.component(component.name, component)
  }
}
