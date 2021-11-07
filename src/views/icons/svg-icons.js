const svgIconsContext = import.meta.globEager(
  "../../components/Icons/components/svg/**.vue"
);
const sketchIconsContext = import.meta.globEager(
  "../../components/Icons/components/sketchSvg/**.vue"
);

export const sketchIcons = ogj2arr(sketchIconsContext);
export const svgIcons = ogj2arr(svgIconsContext);

function ogj2arr(obj) {
  const arr = [];
  for (const i in obj) {
    const component = obj[i]?.default;
    arr.push(component?.name);
  }
  return arr;
}
