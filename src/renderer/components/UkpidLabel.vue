<template>
  <component :is="props.legend ? 'legend' : 'label'" class="UkpidLabel">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  legend: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidLabel {
  display: block;
  color: var(--neutral-foreground-rest);
  cursor: pointer;
  font-family: var(--body-font);
  font-size: var(--type-ramp-base-font-size);
  line-height: var(--type-ramp-base-line-height);
  font-weight: initial;
  font-variation-settings: var(--type-ramp-base-font-variations);
  margin-bottom: 4px;
}
</style>
