<template>
  <fluent-slider
    :value="props.modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <slot />
  </fluent-slider>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
