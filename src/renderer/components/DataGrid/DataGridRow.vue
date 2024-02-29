<template>
  <tr class="DataGridRow">
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.DataGridRow {
  border-bottom: 1px solid var(--neutral-stroke-rest);
}

.DataGridRow:hover {
  background: var(--neutral-fill-hover);
}
</style>
