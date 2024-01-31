<template>
  <div class="Container" role="tooltip">
    <div class="Tooltip"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Container {
  padding: fns.gap(0.25);
  position: absolute;
  z-index: 9999;
}

.Tooltip {
  box-shadow: var(--elevation-shadow-tooltip);
  padding: fns.gap(0.25) fns.gap(0.75);
  border: calc(var(--stroke-width) * 1px) solid transparent;
  overflow-wrap: break-word;
  cursor: default;
  max-width: 240px;
  font-size: var(--type-ramp-minus-1-font-size);
  line-height: var(--type-ramp-minus-1-line-height);
  border-radius: calc(var(--control-corner-radius) * 1px);
  background-color: var(--neutral-layer-floating);
}
</style>
