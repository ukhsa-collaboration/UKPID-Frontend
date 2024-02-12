<template>
  <section class="ContentSection"><slot /></section>
</template>

<style lang="scss" scoped>
@use "@/scss/abstracts/placeholders";
@use "@/scss/abstracts/functions" as fns;

.ContentSection {
  @extend %clean-child-margins;
}
</style>
