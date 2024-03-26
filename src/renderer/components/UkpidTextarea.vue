<template>
  <fluent-text-area
    v-model="model"
    class="UkpidTextArea"
    :class="{ LabelHidden: props.labelHidden }"
  >
    <span v-if="props.labelHidden" class="VisuallyHidden"><slot /></span>
    <template v-else><slot /></template>
  </fluent-text-area>
</template>

<script setup>
const props = defineProps({
  labelHidden: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: null });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.LabelHidden::part(label) {
  margin: 0;
}
</style>
