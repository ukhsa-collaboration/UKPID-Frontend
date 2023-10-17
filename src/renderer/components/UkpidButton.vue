<template>
  <fluent-button :appearance="props.appearance">
    <slot />
  </fluent-button>
</template>

<script setup>
const props = defineProps({
  appearance: {
    type: String,
    default: "accent",
    validator: (value) =>
      ["accent", "lightweight", "neutral", "outline", "stealth"].includes(
        value,
      ),
  },
});
</script>
