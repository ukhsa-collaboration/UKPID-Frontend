<template>
  <UkpidPopover class="Tooltip"><slot /></UkpidPopover>
</template>

<script setup>
import UkpidPopover from "@/components/UkpidPopover.vue";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Tooltip :deep(.Popover) {
  padding: fns.gap(0.25) fns.gap(0.75);
  font-size: var(--type-ramp-minus-1-font-size);
  line-height: var(--type-ramp-minus-1-line-height);
}
</style>
