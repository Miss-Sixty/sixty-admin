const requireAll = (requireContext) => requireContext.keys();

// const svg = /(.*\/)*([^.]+).*/gi; //全部提取
const svg = /\.\/(.*)\.svg/;

export const svgIcons = requireAll(
  require.context("@/icons/svg", true, /\.svg$/)
).map((i) => {
  return i.match(svg)[1];
});
export const sketchIcons = requireAll(
  require.context("@/icons/sketchSvg", true, /\.svg$/)
).map((i) => {
  return i.match(svg)[1];
});
