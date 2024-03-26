<template>
  <div role="tablist" :aria-label="props.label" class="PivotTabs">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  //
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.PivotTabs {
  --tab-padding-x: calc((8 + (var(--design-unit) * 2 * var(--density))) * 1px);

  margin: 0 calc(-1 * var(--tab-padding-x));
}
</style>
