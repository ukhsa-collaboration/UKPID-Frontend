<template>
  <component :is="props.header ? 'th' : 'td'" class="DataGridCell">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  header: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.DataGridCell {
  padding: fns.gap(0.5) fns.gap(0.25);
  text-align: left;
  vertical-align: top;
}
</style>
