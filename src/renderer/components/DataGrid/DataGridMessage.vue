<template>
  <DataGridRow class="MessageRow">
    <DataGridCell :colspan="props.colspan">
      <div class="Message">
        <div v-if="hasSlot('icon')" class="MessageIcon">
          <slot name="icon" />
        </div>
        <slot name="default" />
      </div>
    </DataGridCell>
  </DataGridRow>
</template>

<script setup>
import { useHasSlot } from "@/composables/hasSlot";
import DataGridRow from "@/components/DataGrid/DataGridRow.vue";
import DataGridCell from "@/components/DataGrid/DataGridCell.vue";

const props = defineProps({
  colspan: {
    type: Number,
    required: true,
  },
});

const { hasSlot } = useHasSlot();
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.MessageRow:hover {
  background: transparent;
}

.Message {
  text-align: center;
  padding: fns.gap(2) 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: fns.gap(0.5);
}

.MessageIcon :deep(svg) {
  width: 3rem;
  height: 3rem;
  display: block;
  fill: currentColor;
}
</style>
