<template>
  <fluent-text-field v-model="model">
    <slot />
  </fluent-text-field>
</template>

<script setup>
const model = defineModel({ type: null });
</script>
