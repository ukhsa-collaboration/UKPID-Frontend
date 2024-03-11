<template>
  <div class="SettingItem">
    <div class="Name">
      <span class="Icon">
        <slot name="icon" />
      </span>
      <p ref="label" v-uid class="Label" :class="{ NoIcon: !hasIcon }">
        <slot name="label" />
        <span v-if="hasSlot('label-caption')" class="Caption1">
          <slot name="label-caption" />
        </span>
      </p>
    </div>
    <div class="Control">
      <slot name="control" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useHasSlot } from "@/composables/hasSlot";

const { hasSlot } = useHasSlot();

const label = ref();
const labelId = computed(() => "label");
const hasIcon = computed(() => hasSlot("icon"));

defineExpose({ label });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/placeholders";
@use "@/scss/abstracts/functions" as fns;

.SettingItem {
  @extend %no-child-margins;
  --setting-gap: #{fns.gap(1)};

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: fns.gap(1);
  gap: var(--setting-gap);
  border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-rest);
  border-radius: calc(var(--control-corner-radius) * 1px);
  background: var(--settings-item-background);
}

.Name {
  @extend %clean-child-margins;
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-template-areas: "icon label";
  align-items: center;

  gap: var(--setting-gap);
}

.Icon {
  grid-area: icon;
}

.Icon:deep(svg) {
  display: block;
  fill: currentColor;
}

.Label {
  display: flex;
  grid-area: label;
  flex-direction: column;
}

.Label.NoIcon {
  grid-column: icon-start / label-end;
}

.Control {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  text-align: right;
}
</style>
