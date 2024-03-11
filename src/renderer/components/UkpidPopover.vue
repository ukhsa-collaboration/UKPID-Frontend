<template>
  <div class="Container" role="tooltip">
    <div class="Popover"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Container {
  z-index: 9999;
  position: absolute;
  padding: fns.gap(0.25);
}

.Popover {
  max-width: 240px;
  padding: fns.gap(0.5) fns.gap(0.75);
  border: calc(var(--stroke-width) * 1px) solid transparent;
  border-radius: calc(var(--control-corner-radius) * 1px);
  background-color: var(--neutral-layer-floating);
  box-shadow: var(--elevation-shadow-tooltip);
  overflow-wrap: break-word;
  cursor: default;
}
</style>
