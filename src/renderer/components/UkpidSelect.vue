<template>
  <div class="UkpidSelect">
    <UkpidLabel :for="select?.id">
      <slot name="label" />
    </UkpidLabel>
    <fluent-select
      ref="select"
      v-model="model"
      v-uid
      :class="{ AutoWidth: props.autoWidth }"
      v-bind="$attrs"
    >
      <slot />
    </fluent-select>
  </div>
</template>

<script setup>
import UkpidLabel from "@/components/UkpidLabel.vue";
import { ref } from "vue";

const props = defineProps({
  autoWidth: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: null });

const select = ref(null);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidSelect {
  display: inline-flex;
  flex-direction: column;
}

.AutoWidth {
  min-width: auto;
}
</style>
