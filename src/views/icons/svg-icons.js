const svgIconsContext = import.meta.globEager(
  "../../components/Icons/components/**.vue"
);

export default ogj2arr(svgIconsContext);

function ogj2arr(obj) {
  const arr = [];
  for (const i in obj) {
    const component = obj[i]?.default;
    arr.push(component?.name);
  }
  return arr;
}
