<template>
  <fieldset class="UkpidDateTime">
    <UkpidLabel :legend="true"><slot /></UkpidLabel>
    <label :for="dateEl?.id" class="visually-hidden">{{ $t("Date") }}</label>
    <fluent-text-field
      ref="dateEl"
      v-model="date"
      v-uid
      class="Date"
      type="date"
    />
    <label :for="timeEl?.id" class="visually-hidden">{{ $t("Time") }}</label>
    <fluent-text-field
      ref="timeEl"
      v-model="time"
      v-uid
      class="Time"
      type="time"
      :disabled="props.timeDisabled"
    />
  </fieldset>
</template>

<script setup>
import { ref } from "vue";
import UkpidLabel from "@/components/UkpidLabel.vue";

const props = defineProps({
  timeDisabled: {
    type: Boolean,
    default: false,
  },
});

const date = defineModel("date", { type: String });
const time = defineModel("time", { type: String });
const emit = defineEmits(["update:modelValue"]);

const dateEl = ref(null);
const timeEl = ref(null);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidDateTime {
  display: inline-flex;
  margin: 0;
  padding: 0;
  gap: fns.gap(0.5);
  border: 0;
}
</style>
