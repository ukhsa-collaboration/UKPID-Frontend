<template>
  <div class="UkpidSelect">
    <UkpidLabel
      v-if="hasSlot('label')"
      :for="select?.id"
      :class="{ VisuallyHidden: props.labelHidden }"
    >
      <slot name="label" />
    </UkpidLabel>
    <fluent-select
      ref="select"
      v-model="model"
      v-uid
      class="Select"
      :class="{ AutoWidth: props.autoWidth, LabelHidden: props.labelHidden }"
      :disabled="props.disabled"
      :size="props.size"
    >
      <slot />
    </fluent-select>
  </div>
</template>

<script setup>
import UkpidLabel from "@/components/UkpidLabel.vue";
import { ref } from "vue";
import { useHasSlot } from "@/composables/hasSlot";

const props = defineProps({
  autoWidth: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  labelHidden: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: null });

const { hasSlot } = useHasSlot();

const select = ref(null);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidSelect {
  display: inline-flex;
  flex-direction: column;
}

.AutoWidth {
  min-width: auto;
}

.LabelHidden::part(label) {
  margin: 0;
}
</style>
