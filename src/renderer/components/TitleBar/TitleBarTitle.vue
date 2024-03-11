<template>
  <div class="TitleBarTitle">
    <Logo class="TitleBarTitle__Icon" />
    <slot>
      <span v-if="!props.logoOnly" class="TitleBarTitle__LongName"
        >UK Poisons Information Database</span
      >
      <span v-if="!props.logoOnly" class="TitleBarTitle__ShortName">UKPID</span>
      <span
        v-if="!props.logoOnly && props.releaseTag"
        class="TitleBarTitle__ReleaseTag"
        >{{ props.releaseTag }}</span
      >
    </slot>
  </div>
</template>

<script setup>
import Logo from "@/assets/UKPIDLogoColour.svg";

const props = defineProps({
  logoOnly: {
    type: Boolean,
    default: false,
  },
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
  align-items: center;
  gap: fns.gap(0.5);
}

.TitleBarTitle__Icon {
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
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
