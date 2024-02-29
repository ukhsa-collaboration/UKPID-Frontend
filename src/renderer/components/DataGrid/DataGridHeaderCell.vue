<template>
  <DataGridCell :header="true" class="DataGridHeaderCell">
    <slot />
  </DataGridCell>
</template>

<script setup>
import DataGridCell from "@/components/DataGrid/DataGridCell.vue";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.DataGridHeaderCell {
  font-weight: var(--font-weight-normal);
}
</style>
