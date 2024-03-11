<template>
  <div class="MenuItemInfo">
    <span class="Content"><slot /></span>
  </div>
</template>

<style lang="scss" scoped>
.MenuItemInfo {
  display: grid;
  position: relative;
  grid-template-rows: auto;
  grid-template-columns: minmax(32px, auto) 1fr minmax(32px, auto);
  place-items: center;
  height: calc(
    (var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px
  );
  margin: 0 calc(var(--design-unit) * 1px);
  overflow: hidden;
  border: calc(var(--stroke-width) * 1px) solid transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Content {
  grid-area: 1 / 1 / auto / auto;
  justify-self: start;
  margin-inline-start: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
