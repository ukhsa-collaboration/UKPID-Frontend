<template>
  <thead class="DataGridHeader">
    <slot />
  </thead>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.DataGridHeader :deep(.DataGridRow:hover) {
  background: inherit;
}
</style>
