import _cloneDeep from 'lodash/cloneDeep'
import CountTo from 'vue-count-to/src/vue-countTo.vue'

const Component = _cloneDeep(CountTo)

Component.unmounted = Component.destroyed
Reflect.deleteProperty(Component, 'destroyed')

export default {
  name: 'CountTo',
  emits: ['callback', 'mountedCallback'],
  ...Component,
}
