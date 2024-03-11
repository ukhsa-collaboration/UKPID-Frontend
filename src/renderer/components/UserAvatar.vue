<template>
  <div class="UserAvatar" :class="`Size${props.size}`">
    <PersonIcon />
  </div>
</template>

<script setup>
import PersonIcon from "@fluentui/svg-icons/icons/person_48_regular.svg";

const props = defineProps({
  size: {
    type: Number,
    default: 32,
    validator: (value) =>
      [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128].includes(
        value,
      ),
  },
});
</script>

<style lang="scss" scoped>
.UserAvatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--neutral-fill-input-alt-active);
}

$sizes: 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128;

@each $size in $sizes {
  .Size#{$size} {
    width: #{$size}px;
    height: #{$size}px;
  }
}

.UserAvatar:deep(svg) {
  display: block;
  fill: currentColor;
  width: 62.5%;
  height: 62.5%;
}
</style>
