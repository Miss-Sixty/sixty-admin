const componentsContext = require.context('../../components/Icons/components', true, /index.vue$/)
export default componentsContext.keys().map(file_name => componentsContext(file_name)?.default?.name)
