module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-strongly-recommended', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //强制使用单引号
    quotes: ['error', 'single'],
    //强制不使用分号结尾
    semi: ['error', 'never'],

    //vue
    'vue/attributes-order': 2, //组件属性进行排序
    'vue/order-in-components': 2, //props 声明顺序
    'vue/prop-name-casing': 2, //对 props 进行适当的大小写。
    'vue/require-default-prop': 0, //prop可以不写默认值
  },
}
