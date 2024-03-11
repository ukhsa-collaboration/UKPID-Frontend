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
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    "header"
    "body";
  grid-area: content;
  overflow: hidden;
  gap: fns.gap(1);
}

.ContentHeader {
  @extend %clean-child-margins;

  grid-area: header;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
}

.ContentBody {
  @extend %clean-child-margins;
  grid-area: body;
  width: 100%;
  max-width: 64rem;

  height: 100%;
  margin: 0 auto;
  padding-right: var(--page-gap);
  padding-bottom: var(--page-gap);
  overflow: auto;
}

.ContentBody.Grid {
  display: flex;
  flex-direction: column;
  gap: fns.gap(0.5);
}
</style>
