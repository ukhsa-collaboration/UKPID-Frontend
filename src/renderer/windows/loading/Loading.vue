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
  overflow: auto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--fill-color);
}
</style>
