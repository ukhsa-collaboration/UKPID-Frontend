<template>
  <div class="PopoutNavigationView">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.PopoutNavigationView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: fns.gap(1) var(--page-gap);
  position: relative;
}
</style>
