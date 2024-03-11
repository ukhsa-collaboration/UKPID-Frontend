<template>
  <div class="MainWindowPage"><slot /></div>
</template>

<style lang="scss" scoped>
.MainWindowPage {
  width: 100%;
  height: 100%;
  padding: var(--page-gap);
  overflow: auto;
}
</style>
