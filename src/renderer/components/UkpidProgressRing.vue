<template>
  <div
    class="Component"
    :class="[
      { HasLabel: !!props.label },
      backgroundClass,
      sizeClass,
      labelPositionClass,
    ]"
  >
    <fluent-progress-ring
      class="Icon"
      aria-hidden="true"
    ></fluent-progress-ring>
    <span v-if="label" class="Label">{{ label }}</span>
  </div>
</template>

<script setup>
import { toPascalCase } from "@/modules/util";
import { computed } from "vue";

const props = defineProps({
  background: {
    type: String,
    default: "transparent",
    validator: (value) => ["transparent", "light-grey"].includes(value),
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) =>
      [
        "extra-tiny",
        "tiny",
        "extra-small",
        "small",
        "medium",
        "large",
        "extra-large",
        "huge",
      ].includes(value),
  },
  label: {
    type: String,
    default: null,
  },
  labelPosition: {
    type: String,
    default: "after",
    validator: (value) => ["before", "after", "above", "below"].includes(value),
  },
});

const backgroundClass = computed(
  () => `Background${toPascalCase(props.background)}`,
);

const sizeClass = computed(() => `Size${toPascalCase(props.size)}`);

const labelPositionClass = computed(
  () => `Label${toPascalCase(props.labelPosition)}`,
);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.HasLabel {
  display: inline-grid;
  grid-template-areas: "icon label";
  gap: fns.gap(1);
  justify-items: center;
  align-items: center;
}

.LabelBefore {
  grid-template-areas: "label icon";
}

.LabelAbove {
  grid-template-areas:
    "label"
    "icon";
}

.LabelBelow {
  grid-template-areas:
    "icon"
    "label";
}

.BackgroundLightGrey {
  --background: var(--neutral-stroke-rest);
}

.SizeExtraTiny {
  --base-height-multiplier: 4;
}

.SizeTiny {
  --base-height-multiplier: 5;
}

.SizeExtraSmall {
  --base-height-multiplier: 6;
}

.SizeSmall {
  --base-height-multiplier: 7;
}

.SizeMedium {
  --base-height-multiplier: 8;
}

.SizeLarge {
  --base-height-multiplier: 9;
}

.SizeExtraLarge {
  --base-height-multiplier: 10;
}

.SizeHuge {
  --base-height-multiplier: 11;
}

.Icon {
  grid-area: icon;
}

.Icon::part(background) {
  stroke: var(--background, transparent);
}

.Label {
  grid-area: label;
}
</style>
