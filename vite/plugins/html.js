import { createHtmlPlugin } from 'vite-plugin-html'

export default function createHtml(env) {
  const { VITE_APP_TITLE } = env;
  return createHtmlPlugin({
    minify: true,
    /**
     * 需要注入 index.html ejs 模版的数据
     */
    inject: {
      data: {
        title: VITE_APP_TITLE,
      },
    },
  })
}
