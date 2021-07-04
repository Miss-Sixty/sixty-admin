const req = require.context("@/icons/", true, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys();

const re = /(.*\/)*([^.]+).*/gi;

const svgIcons = requireAll(req).map((i) => {
  return i.replace(re, "$2");
});
export default svgIcons;
