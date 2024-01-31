<template>
  <div class="TitleBarTitle">
    <Logo class="TitleBarTitle__Icon" />
    <span class="TitleBarTitle__LongName">UK Poisons Information Database</span>
    <span class="TitleBarTitle__ShortName">UKPID</span>
    <span class="TitleBarTitle__ReleaseTag">{{ props.releaseTag }}</span>
  </div>
</template>

<script setup>
import Logo from "@/assets/UKPIDLogoColour.svg";

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
  width: 20px;
  height: 20px;
  overflow: hidden;
  position: relative;
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
