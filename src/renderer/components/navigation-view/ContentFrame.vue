<template>
  <div class="ContentFrame">
    <div class="ContentHeader"><slot name="header" /></div>
    <div class="ContentBody" :class="{ Grid: props.bodyGrid }">
      <slot name="body" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bodyGrid: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.ContentFrame {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-row: content-header-start / content-body-end;
  grid-column: content-header-start / content-body-end;
}

.ContentHeader {
  @extend %clean-child-margins;

  grid-area: content-header;
}

.ContentBody {
  @extend %clean-child-margins;

  height: 100%;
  grid-area: content-body;
  overflow: auto;
  padding-right: var(--page-gap);
  padding-bottom: var(--page-gap);
}

.ContentBody.Grid {
  display: flex;
  flex-direction: column;
  gap: fns.gap(1);
}
</style>
