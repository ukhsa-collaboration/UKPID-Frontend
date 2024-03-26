<template>
  <button
    :id="`tab-${props.id}`"
    role="tab"
    :aria-selected="isSelected"
    :aria-controls="`item-${props.id}`"
    class="PivotTab"
    :class="{ Active: isSelected }"
    :disabled="isSelected"
    @click="model = props.id"
  >
    <slot />
    <div v-if="isSelected" class="Indicator" />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const model = defineModel({ type: [String, Number] });

const isSelected = computed(() => props.id === model.value);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.PivotTab {
  --padding-x: var(
    --tab-padding-x,
    calc((8 + (var(--design-unit) * 2 * var(--density))) * 1px)
  );

  position: relative;
  height: calc(
    (
        (var(--base-height-multiplier) + var(--density)) * var(--design-unit) +
          (var(--design-unit) * 2)
      ) * 1px
  );
  margin: 0;
  padding: 0 var(--padding-x);
  border: 0;
  background: transparent;
  color: var(--neutral-foreground-rest);
  font-weight: 400;
  font-size: var(--type-ramp-base-font-size);
  line-height: var(--type-ramp-base-line-height);
  font-family: var(--body-font);
  cursor: pointer;
}

.PivotTab:disabled {
  color: inherit;
  cursor: inherit;
}

.Indicator {
  position: absolute;
  bottom: 0;
  left: var(--padding-x);
  width: calc(100% - var(--padding-x) * 2);
  height: 0;
  border-top: 2px solid var(--accent-fill-rest);
  border-bottom: 1px solid var(--accent-fill-rest);
  border-radius: calc(1px * var(--control-corner-radius));
}
</style>
