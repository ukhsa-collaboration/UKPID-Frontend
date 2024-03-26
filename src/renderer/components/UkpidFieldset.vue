<template>
  <fieldset class="UkpidFieldset">
    <slot />
  </fieldset>
</template>

<script setup>
const model = defineModel({ type: null });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.UkpidFieldset {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
