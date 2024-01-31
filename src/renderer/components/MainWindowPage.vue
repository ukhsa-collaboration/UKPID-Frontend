<template>
  <div class="MainWindowPage"><slot /></div>
</template>

<style lang="scss">
.MainWindowPage {
  padding: var(--page-gap);
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
