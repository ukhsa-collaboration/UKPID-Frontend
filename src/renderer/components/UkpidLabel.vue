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
  margin-bottom: 4px;
  color: var(--neutral-foreground-rest);
  font-weight: initial;
  font-size: var(--type-ramp-base-font-size);
  line-height: var(--type-ramp-base-line-height);
  font-family: var(--body-font);
  font-variation-settings: var(--type-ramp-base-font-variations);
  cursor: pointer;
}
</style>
