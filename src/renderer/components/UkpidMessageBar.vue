<template>
  <div
    :class="[
      'MessageBar',
      capitalize(props.intent),
      { Compact: props.compact },
    ]"
  >
    <div class="Icon">
      <InfoIcon v-if="props.intent === 'info'" />
      <WarningIcon v-if="props.intent === 'warning'" />
      <ErrorIcon v-if="props.intent === 'error'" />
      <SuccessIcon v-if="props.intent === 'success'" />
    </div>
    <div class="Content">
      <span v-if="hasSlot('title')" class="Title">
        <slot name="title" />
      </span>
      <slot name="message" />
      <span v-if="hasSlot('link')" class="Link">
        <slot name="link" />
      </span>
    </div>
    <!--    <div class="Actions">-->
    <!--      <Button>Action</Button>-->
    <!--      <Button>Action</Button>-->
    <!--      <Button-->
    <!--        aria-label="dismiss"-->
    <!--        appearance="transparent"-->
    <!--        icon="{<DismissRegular"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script setup>
// Based on https://react.fluentui.dev/?path=/docs/components-messagebar--default

import { useSlots } from "vue";
import InfoIcon from "@fluentui/svg-icons/icons/info_20_filled.svg";
import WarningIcon from "@fluentui/svg-icons/icons/warning_20_filled.svg";
import ErrorIcon from "@fluentui/svg-icons/icons/error_circle_20_filled.svg";
import SuccessIcon from "@fluentui/svg-icons/icons/checkmark_circle_20_filled.svg";
import { capitalize } from "@/modules/util";

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
  intent: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "warning", "error", "success"].includes(value),
  },
});

const slots = useSlots();
const hasSlot = (name) => {
  return !!slots[name];
};
</script>

<style scoped lang="scss">
@use "@/scss/abstracts/functions" as fns;

.MessageBar {
  --background: var(--neutral-layer-3);
  --border: var(--neutral-stroke-rest);
  --icon-color: var(--neutral-fill-strong-rest);

  background-color: var(--background);
  border: calc(var(--stroke-width) * 1px) solid var(--border);
  border-radius: calc(var(--control-corner-radius) * 1px);
  align-items: center;
  min-height: 36px;
  box-sizing: border-box;
  padding-left: fns.gap(0.75);
  display: grid;
  grid-template: "icon body secondaryActions actions" 1fr / auto 1fr auto auto;
  white-space: nowrap;
}

.Compact {
  grid-template-areas:
    "icon body actions"
    "secondaryActions secondaryActions secondaryActions";
  grid-template-columns: auto 1fr auto;
  padding-top: fns.gap(0.5);
  padding-bottom: fns.gap(0.5);
  align-items: start;
  white-space: normal;
}

.Warning {
  --background: var(--color-status-warning-background);
  --border: var(--color-status-warning-border);
  --icon-color: var(--color-status-warning-foreground);
}

.Error {
  --background: var(--color-status-danger-background);
  --border: var(--color-status-danger-border);
  --icon-color: var(--color-status-danger-foreground);
}

.Success {
  --background: var(--color-status-success-background);
  --border: var(--color-status-success-border);
  --icon-color: var(--color-status-success-foreground);
}

.Icon {
  grid-area: icon;
  margin-right: fns.gap(0.5);
  display: flex;
  align-items: center;
  fill: var(--icon-color);
}

.Content {
  grid-area: body;
  padding-right: fns.gap(0.75);
}

.Title {
  font-weight: var(--font-weight-semibold);

  &::after {
    content: " ";
  }
}
</style>
