<template>
  <fluent-checkbox v-model="model" class="UkpidCheckbox">
    <slot />
  </fluent-checkbox>
</template>

<script setup>
const model = defineModel({ type: null });
</script>
