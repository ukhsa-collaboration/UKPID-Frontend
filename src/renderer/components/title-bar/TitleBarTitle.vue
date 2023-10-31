<template>
  <div class="TitleBarTitle">
    <img class="TitleBarTitle__Icon" alt="" src="" />
    <span class="TitleBarTitle__LongName">UK Poisons Information Database</span>
    <span class="TitleBarTitle__ShortName">UKPID</span>
    <span class="TitleBarTitle__ReleaseTag">{{ props.releaseTag }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  releaseTag: {
    type: String,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/variables/breakpoints";

$show-short-name: breakpoints.$sm;
$show-long-name: breakpoints.$md;

.TitleBarTitle {
  display: inline-flex;
  gap: fns.gap(0.5);
  align-items: center;
}

.TitleBarTitle__Icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.TitleBarTitle__Icon::after {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--accent-fill-rest);
  content: "";
}

.TitleBarTitle__ShortName {
  display: none;

  @media (#{$show-short-name} <= width < #{$show-long-name}) {
    display: revert;
  }
}

.TitleBarTitle__LongName {
  display: none;

  @media (width >= #{$show-long-name}) {
    display: revert;
  }
}

.TitleBarTitle__ReleaseTag {
  color: var(--neutral-foreground-hint);
}
</style>
