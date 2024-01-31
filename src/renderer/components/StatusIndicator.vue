<template>
  <div class="Status" :class="`Status--${capitalize(props.status)}`">
    <div ref="statusIndicator" class="Status__Indicator" aria-hidden="true" />
    <slot class="Status__Label" />
  </div>
</template>

<script setup>
import { capitalize } from "@/modules/util";

const props = defineProps({
  status: {
    type: String,
    default: "unknown",
    validator: (value) =>
      ["connected", "connecting", "disconnected", "unknown"].includes(value),
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Status {
  --status-color: var(--neutral-layer-4);

  display: inline-flex;
  gap: fns.gap(0.5);
  align-items: center;
}

.Status--Connected {
  --status-color: var(--color-status-success-foreground);
}

.Status--Connecting {
  --status-color: var(--color-status-warning-foreground);
}

.Status--Disconnected {
  --status-color: var(--color-status-danger-foreground);
}

.Status__Indicator {
  background-color: var(--status-color);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
</style>
