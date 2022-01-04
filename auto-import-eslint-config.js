module.exports = {
  globals: {
    // lifecycle
    onActivated: 'readonly',
    onBeforeMount: 'readonly',
    onBeforeUnmount: 'readonly',
    onBeforeUpdate: 'readonly',
    onDeactivated: 'readonly',
    onErrorCaptured: 'readonly',
    onMounted: 'readonly',
    onServerPrefetch: 'readonly',
    onUnmounted: 'readonly',
    onUpdated: 'readonly',
    // reactivity
    computed: 'readonly',
    customRef: 'readonly',
    isReadonly: 'readonly',
    isRef: 'readonly',
    markRaw: 'readonly',
    reactive: 'readonly',
    readonly: 'readonly',
    ref: 'readonly',
    shallowReactive: 'readonly',
    shallowReadonly: 'readonly',
    shallowRef: 'readonly',
    toRaw: 'readonly',
    toRef: 'readonly',
    toRefs: 'readonly',
    triggerRef: 'readonly',
    unref: 'readonly',
    watch: 'readonly',
    watchEffect: 'readonly',
    // component
    defineComponent: 'readonly',
    defineAsyncComponent: 'readonly',
    getCurrentInstance: 'readonly',
    h: 'readonly',
    inject: 'readonly',
    nextTick: 'readonly',
    provide: 'readonly',
    useCssModule: 'readonly',
    // other
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    // vue-router
    useRoute: 'readonly',
    useRouter: 'readonly',
  }
}
