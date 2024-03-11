<template>
  <div class="Status">
    <ConnectedIcon
      v-if="props.status === 'connected'"
      class="Indicator"
      aria-hidden="true"
    />
    <ConnectingIcon
      v-if="props.status === 'connecting'"
      class="Indicator"
      aria-hidden="true"
    />
    <DisconnectedIcon
      v-if="props.status === 'disconnected'"
      class="Indicator"
      aria-hidden="true"
    />
    <span :class="{ 'visually-hidden': !props.showLabel }">
      <slot />
    </span>
  </div>
</template>

<script setup>
import ConnectedIcon from "@fluentui/svg-icons/icons/cloud_20_filled.svg";
import ConnectingIcon from "@fluentui/svg-icons/icons/cloud_swap_20_filled.svg";
import DisconnectedIcon from "@fluentui/svg-icons/icons/cloud_off_20_filled.svg";

const props = defineProps({
  status: {
    type: String,
    default: "unknown",
    validator: (value) =>
      ["connected", "connecting", "disconnected", "unknown"].includes(value),
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Status {
  display: inline-flex;
  gap: fns.gap(0.5);
  align-items: center;
}

.Indicator {
  fill: currentColor;
}
</style>
