<template>
  <div
    :style="`--width: ${field.width ?? 100}`"
    class="EnquiryField"
    :class="{ Subfield: props.isSubfield }"
    :data-key="field.field"
  >
    <UkpidTextField
      v-if="['text', 'date', 'time', 'number'].includes(field.type)"
      v-model="form[field.field]"
      :type="field.type"
      :label-hidden="field?.nameHidden"
    >
      {{ field.name }}
    </UkpidTextField>
    <UkpidTextarea
      v-else-if="'textarea' === field.type"
      v-model="form[field.field]"
      :label-hidden="field?.nameHidden"
    >
      {{ field.name }}
    </UkpidTextarea>
    <UkpidFieldset v-else-if="'checkbox' === field.type">
      <UkpidLabel :legend="true">
        {{ field.name }}
      </UkpidLabel>
      <UkpidCheckbox
        v-for="(label, value) in processValues(field)"
        :key="value"
        :value="value"
      >
        {{ label }}
      </UkpidCheckbox>
    </UkpidFieldset>
    <UkpidFieldset v-else-if="'fieldset' === field.type" class="Fieldset">
      <UkpidLabel :legend="true">
        {{ field.fieldsetLegend }}
      </UkpidLabel>
      <div class="FieldsetFields">
        <EnquiryField
          v-for="subfield in field.fields"
          :key="subfield.field"
          v-model="form"
          :field="subfield"
          :codes="props.codes"
          :is-subfield="true"
        />
      </div>
    </UkpidFieldset>
    <UkpidSelect
      v-else-if="'dropdown' === field.type"
      v-model="form[field.field]"
      :label-hidden="field?.nameHidden"
    >
      <template #label>
        {{ field.name }}
      </template>
      <UkpidOption
        v-for="(label, value) in processValues(field)"
        :key="value"
        :value="value"
      >
        {{ label }}
      </UkpidOption>
    </UkpidSelect>
    <UkpidLookup
      v-else-if="'lookup' === field.type"
      v-model="form[field.field]"
      :values="processValues(field)"
    >
      {{ field.name }}
    </UkpidLookup>
    <div v-else-if="'space' === field.type" aria-hidden="true" />
    <p v-else>To do: {{ field.type }}</p>
  </div>
</template>

<script setup>
import UkpidTextField from "@/components/UkpidTextField.vue";
import UkpidSelect from "@/components/UkpidSelect.vue";
import UkpidOption from "@/components/UkpidOption.vue";
import UkpidLookup from "@/components/UkpidLookup.vue";
import UkpidTextarea from "@/components/UkpidTextarea.vue";
import UkpidLabel from "@/components/UkpidLabel.vue";
import UkpidCheckbox from "@/components/UkpidCheckbox.vue";
import UkpidFieldset from "@/components/UkpidFieldset.vue";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  codes: {
    type: Object,
    required: true,
  },
  isSubfield: {
    type: Boolean,
    default: false,
  },
});

const form = defineModel({ type: Object });

const processValues = (field) => {
  if (Object.hasOwn(field, "code")) {
    return props.codes[field.code] ?? {};
  }

  return field.values;
};
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.EnquiryField {
  width: calc(1% * var(--width));
  padding: fns.gap(0.5);

  > * {
    width: 100%;
  }
}

.Subfield {
  padding: 0;
}

.FieldsetFields {
  display: flex;
  //flex-wrap: wrap;
  width: 100%;
  //margin: fns.gap(-0.5);
}

.Fieldset::part(label) {
  display: none;
}

:deep(.UkpidSelect) fluent-select {
  min-width: auto;
}
</style>
