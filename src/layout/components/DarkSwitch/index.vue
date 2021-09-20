<template>
  <div class="dark-switch" role="button" @click="isDarkMode = !isDarkMode" :class="{ 'dark-switch--dark': isDarkMode }">
    <div class="dark-switch-check">
      <sun-fill class="dark-switch__icon sun" />
      <moon-clear-fill class="dark-switch__icon moon" />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
const isDarkPreferred = usePreferredDark()
const darkStorage = useStorage('theme', 'auto')

const isDarkMode = computed({
  get() {
    if (darkStorage.value === 'auto') return isDarkPreferred.value
    return darkStorage.value === 'dark'
  },
  set(val) {
    if (val === isDarkPreferred.value) return (darkStorage.value = 'auto')
    darkStorage.value = val ? 'dark' : 'light'
  },
})

const updateHtmlDarkClass = (value = isDarkMode.value) => {
  const htmlEl = window?.document.querySelector('html')
  htmlEl?.classList.toggle('dark', value)
}

watch(isDarkMode, updateHtmlDarkClass, { immediate: true })
</script>

<style lang="scss" scoped>
.dark-switch {
  margin: 0 8px;
  position: relative;
  border-radius: 11px;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--c-divider);
  background-color: var(--c-bg-mute);
  transition: border-color 0.25s, background-color 0.25s;
  &:hover {
    border-color: var(--c-gray);
  }

  &-check {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--c-white);
    box-shadow: var(--shadow-1);
    transition: background-color 0.25s, transform 0.25s;
  }

  &__icon {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 12px;
    height: 12px;
    color: var(--c-text-1);
    transition: opacity 0.25s, color 0.25s;
    &.moon {
      opacity: 0;
    }
    &.sun {
      opacity: 1;
    }
  }

  &--dark {
    .dark-switch {
      &-check {
        transform: translateX(18px);
        background-color: var(--c-black);
      }
      &__icon {
        &.moon {
          opacity: 1;
        }
        &.sun {
          opacity: 0;
        }
      }
    }
  }
}
</style>
