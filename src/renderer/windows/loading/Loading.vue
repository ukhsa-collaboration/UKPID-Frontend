<template>
  <div class="Loading">
    <FluentProgressRing
      size="huge"
      :label="$t('Just a moment&hellip;')"
      label-position="below"
    />
  </div>
</template>

<script setup>
import FluentProgressRing from "@/components/FluentProgressRing.vue";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Loading {
  overflow: auto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--fill-color);
}
</style>
