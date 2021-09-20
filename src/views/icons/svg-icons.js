const svgIconsContext = require.context('../../components/Icons/components/svg', true, /index.vue$/)
export const svgIcons = svgIconsContext.keys().map(file_name => svgIconsContext(file_name)?.default?.name)

const sketchIconsContext = require.context('../../components/Icons/components/sketchSvg', true, /index.vue$/)
export const sketchIcons = sketchIconsContext.keys().map(file_name => sketchIconsContext(file_name)?.default?.name)
