<template>
  <div class="AuditSort">
    <UkpidSelect
      v-model="orderBy"
      class="OrderBy"
      :auto-width="true"
      :disabled="props.disabled"
      @change="$emit('apply')"
    >
      <template #label>
        {{ $t("Order by") }}
      </template>
      <template #default>
        <UkpidOption value="date" data-test="date"
          >{{ $t("Date") }}
        </UkpidOption>
        <UkpidOption value="id" data-test="id"
          >{{ $t("User ID") }}
        </UkpidOption>
      </template>
    </UkpidSelect>
    <UkpidSelect
      v-model="order"
      class="Order"
      :auto-width="true"
      :disabled="props.disabled"
      @change="$emit('apply')"
    >
      <template #label>
        {{ $t("Order") }}
      </template>
      <template #default>
        <UkpidOption value="desc" data-test="desc"
          >{{ $t("Descending") }}
        </UkpidOption>
        <UkpidOption value="asc" data-test="asc"
          >{{ $t("Ascending") }}
        </UkpidOption>
      </template>
    </UkpidSelect>
  </div>
</template>

<script setup>
import UkpidSelect from "@/components/UkpidSelect.vue";
import UkpidOption from "@/components/UkpidOption.vue";

const props = defineProps({
  modelSortLabel: {
    type: String,
    default: "ID",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const order = defineModel("order", { type: null });
const orderBy = defineModel("orderBy", { type: null });

const emit = defineEmits(["apply"]);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.AuditSort {
  display: flex;
  gap: fns.gap(0.5);
}

.OrderBy {
  width: 7rem;
}

.Order {
  width: 10rem;
}
</style>
