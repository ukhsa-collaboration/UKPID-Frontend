<template>
  <fluent-text-field
    v-model="model"
    class="UkpidTextField"
    :class="[
      capitalize(props.size),
      {
        SlotStart: hasSlot('start'),
        SlotEnd: hasSlot('end'),
      },
    ]"
  >
    <div v-if="hasSlot('start')" slot="start" class="Slot">
      <slot name="start" />
    </div>
    <slot />
    <div v-if="hasSlot('end')" slot="end" class="Slot">
      <slot name="end" />
    </div>
  </fluent-text-field>
</template>

<script setup>
import { capitalize } from "@/modules/util";
import { useHasSlot } from "@/composables/hasSlot";

const props = defineProps({
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

const { hasSlot } = useHasSlot();

const model = defineModel({ type: null });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.Slot {
  display: inline-flex;
}

.Small {
  font-size: var(--type-ramp-minus-1-font-size);
  line-height: var(--type-ramp-minus-1-line-height);
}

.Large {
  font-size: var(--type-ramp-plus-1-font-size);
  line-height: var(--type-ramp-plus-1-line-height);
}

.UkpidTextField :deep(svg) {
  fill: currentColor;
  width: 1.428em; // 20px at base
  height: 1.428em; // 20px at base
}

.UkpidTextField {
  height: fit-content;
}

// Base/Medium
.UkpidTextField::part(root) {
  height: auto;
  min-height: 2rem;
}

.UkpidTextField::part(control) {
  padding: 0 calc(var(--design-unit) * 2px + 2px);
}

.UkpidTextField.SlotStart::part(control) {
  padding-left: calc(var(--design-unit) * 1px);
}

.UkpidTextField.SlotEnd::part(control) {
  padding-right: calc(var(--design-unit) * 1px);
}

.UkpidTextField.SlotStart::part(start) {
  margin-inline-start: calc(var(--design-unit) * 2px + 2px);
}

.UkpidTextField.SlotEnd::part(end) {
  margin-inline-end: calc(var(--design-unit) * 2px + 2px);
}

// Small
.Small::part(root) {
  min-height: 1.5rem;
}

.Small::part(control) {
  padding: 0 calc(var(--design-unit) * 1px + 2px);
}

.Small.SlotStart::part(control) {
  padding-left: calc(var(--design-unit) * 1px);
}

.Small.SlotEnd::part(control) {
  padding-right: calc(var(--design-unit) * 1px);
}

.Small.SlotStart::part(start) {
  margin-inline-start: calc(var(--design-unit) * 1px + 2px);
}

.Small.SlotEnd::part(end) {
  margin-inline-end: calc(var(--design-unit) * 1px + 2px);
}

// Large
.Large::part(root) {
  min-height: 2.5rem;
}

.Large::part(control) {
  padding: 0 calc(var(--design-unit) * 3px);
}

.Large.SlotStart::part(control) {
  padding-left: calc(var(--design-unit) * 2px);
}

.Large.SlotEnd::part(control) {
  padding-right: calc(var(--design-unit) * 2px);
}

.Large.SlotStart::part(start) {
  margin-inline-start: calc(var(--design-unit) * 3px);
}

.Large.SlotEnd::part(end) {
  margin-inline-end: calc(var(--design-unit) * 3px);
}
</style>
