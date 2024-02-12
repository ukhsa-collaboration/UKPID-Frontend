<template>
  <div class="MenuItemInfo">
    <span class="Content"><slot /></span>
  </div>
</template>

<style lang="scss" scoped>
.MenuItemInfo {
  height: calc(
    (var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px
  );
  white-space: nowrap;
  border: calc(var(--stroke-width) * 1px) solid transparent;
  position: relative;
  margin: 0 calc(var(--design-unit) * 1px);
  overflow: hidden;
  text-overflow: ellipsis;
  display: grid;
  grid-template-columns: minmax(32px, auto) 1fr minmax(32px, auto);
  grid-template-rows: auto;
  place-items: center;
}

.Content {
  grid-area: 1 / 1 / auto / auto;
  margin-inline-start: 10px;
  justify-self: start;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
