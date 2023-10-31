<template>
  <div class="MainWindowPage"><slot /></div>
</template>

<style lang="scss">
.MainWindowPage {
  padding: var(--base-gap);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
