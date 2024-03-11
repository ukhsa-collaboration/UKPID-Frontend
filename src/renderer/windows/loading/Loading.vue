<template>
  <div class="Loading">
    <UkpidProgressRing
      size="huge"
      :label="$t('Just a moment&hellip;')"
      label-position="below"
    />
  </div>
</template>

<script setup>
import UkpidProgressRing from "@/components/UkpidProgressRing.vue";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--fill-color);
}
</style>
