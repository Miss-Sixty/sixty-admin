import htmlPlugin from "vite-plugin-html";

export default function createHtml(env, isBuild) {
  const { VITE_APP_TITLE } = env;
  const html = htmlPlugin({
    inject: {
      injectData: {
        title: VITE_APP_TITLE,
      },
    },
    minify: isBuild,
  });
  return html;
}
