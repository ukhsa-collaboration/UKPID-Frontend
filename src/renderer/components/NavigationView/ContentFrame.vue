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
  grid-area: content;
  grid-template-areas:
    "header"
    "body";
  gap: fns.gap(1);
  overflow: hidden;
}

.ContentHeader {
  @extend %clean-child-margins;

  grid-area: header;
  margin: 0 auto;
  max-width: 64rem;
  width: 100%;
}

.ContentBody {
  @extend %clean-child-margins;

  height: 100%;
  grid-area: body;
  margin: 0 auto;
  max-width: 64rem;
  width: 100%;
  overflow: auto;
  padding-right: var(--page-gap);
  padding-bottom: var(--page-gap);
}

.ContentBody.Grid {
  display: flex;
  flex-direction: column;
  gap: fns.gap(0.5);
}
</style>
