<template>
  <div class="PopoutNavigationView">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.PopoutNavigationView {
  display: grid;
  position: relative;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "content";
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: fns.gap(1) var(--page-gap);
}
</style>
