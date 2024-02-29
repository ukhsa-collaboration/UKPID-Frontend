<template>
  <div class="UkpidLayer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidLayer {
  margin-bottom: var(--page-gap);
  background: var(--neutral-layer-floating);
  background:
    padding-box linear-gradient(var(--neutral-layer-1), var(--neutral-layer-1)),
    border-box var(--neutral-stroke-input-rest);
  border: calc(var(--stroke-width) * 1px) solid transparent;
  border-radius: calc(var(--control-corner-radius) * 1px);
  padding: fns.gap(1);
}
</style>
