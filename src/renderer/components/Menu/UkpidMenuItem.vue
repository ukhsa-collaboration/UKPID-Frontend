<template>
  <fluent-menu-item class="UkpidMenuItem">
    <span v-if="hasSlot('start')" slot="start">
      <slot name="start" />
    </span>
    <slot />
  </fluent-menu-item>
  <span v-if="hasSlot('end')" slot="end">
    <slot name="end" />
  </span>
</template>

<script setup>
import { useHasSlot } from "@/composables/hasSlot";

const { hasSlot } = useHasSlot();
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.UkpidMenuItem :deep(svg) {
  display: inline-block;
  fill: currentColor;
}
</style>
