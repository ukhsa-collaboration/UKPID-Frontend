<template>
  <div class="DataGridContainer">
    <table class="DataGrid">
      <slot />
    </table>
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.DataGridContainer {
  overflow: auto;
}

.DataGrid {
  width: 100%;
  border-collapse: collapse;
}
</style>
