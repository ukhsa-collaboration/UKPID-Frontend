<template>
  <UkpidLayer class="AuditFilters">
    <UkpidTextField v-model="id" class="Id"
      >{{ props.modelFilterLabel }}
    </UkpidTextField>
    <UkpidSelect v-model="event" class="Event" :auto-width="true">
      <template #label>
        {{ $t("Event") }}
      </template>
      <template #default>
        <UkpidOption value="" data-test="all">{{ $t("All") }}</UkpidOption>
        <UkpidOption value="created" data-test="created"
          >{{ $t("audit.event.created") }}
        </UkpidOption>
        <UkpidOption value="updated" data-test="updated"
          >{{ $t("audit.event.updated") }}
        </UkpidOption>
        <UkpidOption value="deleted" data-test="deleted"
          >{{ $t("audit.event.deleted") }}
        </UkpidOption>
        <UkpidOption value="restored" data-test="restored"
          >{{ $t("audit.event.restored") }}
        </UkpidOption>
      </template>
    </UkpidSelect>
    <UkpidTextField v-model="owner" class="Owner"
      >{{ $t("Made by") }}
    </UkpidTextField>
    <UkpidSelect v-model="field" class="Field" :auto-width="true">
      <template #label>
        {{ $t("Field") }}
      </template>
      <template #default>
        <UkpidOption value="" data-test="Any">{{ $t("Any") }}</UkpidOption>
        <UkpidOption
          v-for="(label, key) in props.fields"
          :key="key"
          :value="key"
          :data-test="key"
          >{{ label }}
        </UkpidOption>
      </template>
    </UkpidSelect>
    <div class="AuditFilters">
      <UkpidDateTime
        v-model:date="d_from"
        v-model:time="t_from"
        class="DateFrom"
        :time-disabled="allDay"
        @change="dateFromChanged"
      >
        {{ $t("From Date") }}
      </UkpidDateTime>
      <UkpidDateTime
        v-model:date="d_to"
        v-model:time="t_to"
        class="DateTo"
        :time-disabled="allDay"
        @change="dateToChanged"
      >
        {{ $t("Until Date") }}
      </UkpidDateTime>
      <UkpidSwitch
        v-model="allDay"
        class="AllDay"
        :show-messages="false"
        @change="
          dateFromChanged();
          dateToChanged();
        "
      >
        <template #checked-message>{{ $t("Yes") }}</template>
        <template #unchecked-message>{{ $t("No") }}</template>
        <template #label>{{ $t("All Day") }}</template>
      </UkpidSwitch>
    </div>
    <UkpidButtonGroup class="Buttons">
      <UkpidButton
        appearance="outline"
        :disabled="props.disabled"
        @click="$emit('reset')"
        >{{ $t("Reset all") }}</UkpidButton
      >
      <UkpidButton
        appearance="accent"
        :disabled="props.disabled"
        @click="$emit('apply')"
        >{{ $t("Apply Filters") }}</UkpidButton
      >
    </UkpidButtonGroup>
  </UkpidLayer>
</template>

<script setup>
import { ref, watch } from "vue";
import UkpidSelect from "@/components/UkpidSelect.vue";
import UkpidLayer from "@/components/UkpidLayer.vue";
import UkpidTextField from "@/components/UkpidTextField.vue";
import UkpidOption from "@/components/UkpidOption.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidButtonGroup from "@/components/UkpidButtonGroup.vue";
import UkpidDateTime from "@/components/UkpidDateTime.vue";
import UkpidSwitch from "@/components/UkpidSwitch.vue";

const props = defineProps({
  modelFilterLabel: {
    type: String,
    default: "ID",
  },
  fields: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const id = defineModel("id", { type: null });
const owner = defineModel("owner", { type: null });
const event = defineModel("event", { type: null });
const field = defineModel("field", { type: null });
const date_from = defineModel("date_from", { type: null });
const date_to = defineModel("date_to", { type: null });
const allDay = defineModel("allDay", { type: Boolean });

const emit = defineEmits(["apply", "reset"]);

const d_from = ref();
const t_from = ref();
const d_to = ref();
const t_to = ref();

watch(date_from, async (newValue) => {
  d_from.value = newValue?.split("T")[0] ?? null;
  t_from.value = newValue?.split("T")[1] ?? null;
});

const dateFromChanged = () => {
  const date = d_from.value ?? new Date().toISOString().split("T")[0];
  const time = allDay.value ? "00:00" : t_from.value ?? "00:00";

  date_from.value = `${date}T${time}`;
};

watch(date_to, async (newValue) => {
  d_to.value = newValue?.split("T")[0] ?? null;
  t_to.value = newValue?.split("T")[1] ?? null;
});
const dateToChanged = () => {
  const date = d_to.value ?? new Date().toISOString().split("T")[0];
  const time = allDay.value ? "23:59" : t_to.value ?? "23:59";

  date_to.value = `${date}T${time}`;
};
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.AuditFilters {
  display: flex;
  flex-wrap: wrap;
  gap: fns.gap(1);
}

.AuditFilters > * {
  flex-grow: 1;
}

.Id {
  flex-basis: 6rem;
}

.Event {
  flex-basis: 6rem;
}

.Field {
  flex-basis: 6rem;
}

.DateFrom {
  flex-grow: 0;
}

.DateTo {
  flex-grow: 0;
}

.Buttons {
  align-items: end;
  justify-content: end;
}
</style>
