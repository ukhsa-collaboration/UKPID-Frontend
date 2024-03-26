<template>
  <fluent-switch
    class="UkpidSwitch"
    :class="{ NoMessages: !props.showMessages, Vertical: !props.horizontal }"
    :checked="model"
    type="checkbox"
    @change="change"
  >
    <span
      slot="checked-message"
      :class="{ VisuallyHidden: !props.showMessages }"
      ><slot name="checked-message">{{ $t("Yes") }}</slot></span
    >
    <span
      slot="unchecked-message"
      :class="{ VisuallyHidden: !props.showMessages }"
      ><slot name="unchecked-message">{{ $t("No") }}</slot></span
    >
    <UkpidLabel v-if="hasSlot('label')"><slot name="label" /></UkpidLabel>
    <svg
      slot="switch"
      class="Switch"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="12" height="12" rx="6"></rect>
    </svg>
  </fluent-switch>
</template>

<script setup>
import UkpidLabel from "@/components/UkpidLabel.vue";
import { useHasSlot } from "@/composables/hasSlot";

const props = defineProps({
  horizontal: {
    type: Boolean,
    default: false,
  },
  showMessages: {
    type: Boolean,
    default: true,
  },
});

const model = defineModel({ type: null });

const { hasSlot } = useHasSlot();

const change = (ev) => {
  model.value = ev.target.checked;
};
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidSwitch.Vertical {
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content max-content;
  grid-template-areas:
    "label label"
    "switch message";
}

.UkpidSwitch.Vertical::part(label) {
  grid-area: label;
  margin-inline-end: 0;
}

.Switch {
  width: 1rem;
  height: 1rem;
}

.UkpidSwitch.Vertical::part(switch) {
  grid-area: switch;
}

.UkpidSwitch.Vertical.NoMessages::part(switch) {
  grid-column: switch-start / message-end;
}

.UkpidSwitch.Vertical::part(status-message) {
  grid-area: message;
}
</style>
