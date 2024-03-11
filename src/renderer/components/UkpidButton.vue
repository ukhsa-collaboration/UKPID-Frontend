<template>
  <fluent-button
    :appearance="props.appearance"
    class="UkpidButton"
    :class="[
      capitalize(props.size),
      capitalize(props.appearance),
      {
        IconStart: hasSlot('icon') && iconPosition === 'start',
        IconEnd: hasSlot('icon') && iconPosition === 'end',
        Slim: props.slim,
      },
    ]"
  >
    <div v-if="hasSlot('icon')" :slot="iconPosition" class="Icon">
      <slot name="icon" />
    </div>
    <slot />
  </fluent-button>
</template>

<script setup>
import { useHasSlot } from "@/composables/hasSlot";
import { capitalize } from "@/modules/util";

const props = defineProps({
  appearance: {
    type: String,
    default: "accent",
    validator: (value) =>
      [
        "accent",
        "lightweight",
        "neutral",
        "outline",
        "stealth",
        "transparent",
      ].includes(value),
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  iconPosition: {
    type: String,
    default: "start",
    validator: (value) => ["start", "end"].includes(value),
  },
  slim: {
    type: Boolean,
    default: false,
  },
});

const { hasSlot } = useHasSlot();
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.UkpidButton {
  height: auto;
}

.UkpidButton.IconStart::part(start) {
  margin-inline-end: 6px;
}

.UkpidButton.IconEnd::part(end) {
  margin-inline-start: 6px;
}

.Slim {
  min-width: 0;
}

.Slim::part(control) {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.Small {
  font-size: var(--type-ramp-minus-1-font-size);
  line-height: var(--type-ramp-minus-1-line-height);
}

.Small::part(control) {
  padding: 3px calc((8 + (var(--design-unit) * 2 * var(--density))) * 1px);
}

.Small.IconStart::part(start) {
  margin-inline-end: 4px;
}

.Small.IconEnd::part(end) {
  margin-inline-start: 4px;
}

.Medium::part(control) {
  padding: 5px calc((8 + (var(--design-unit) * 2 * var(--density))) * 1px);
}

.Large {
  font-size: var(--type-ramp-plus-1-font-size);
  line-height: var(--type-ramp-plus-1-line-height);
}

.Large::part(control) {
  padding: 8px calc((8 + (var(--design-unit) * 2 * var(--density))) * 1px);
}

.Icon {
  display: inline-flex;
}

.UkpidButton :deep(svg) {
  fill: currentColor;
  width: 1.428em; // 20px at base
  height: 1.428em; // 20px at base
}

.Transparent::part(control) {
  background: transparent;
}

.Transparent:not([disabled]):hover::part(control) {
  background: var(--transparent-button-background-hover);
}
</style>
