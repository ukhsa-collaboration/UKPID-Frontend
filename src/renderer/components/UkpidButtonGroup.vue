<template>
  <div class="UkpidButtonGroup">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidButtonGroup {
  display: flex;
  flex-wrap: wrap;
  gap: fns.gap(1) fns.gap(0.5);
}
</style>
