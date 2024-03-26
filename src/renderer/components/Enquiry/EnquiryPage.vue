<template>
  <div class="EnquiryPage">
    <div
      v-for="(column, i) in page"
      :key="i"
      class="Column"
      :style="`--width: ${column.width ?? 100}`"
    >
      <div
        v-for="section in column.sections"
        :key="section.title"
        class="FieldGroup"
      >
        <h2 class="Subtitle1">{{ section.title }}</h2>
        <div class="Fields">
          <EnquiryField
            v-for="field in section.fields"
            :key="field.field"
            v-model="form"
            :field="field"
            :codes="props.codes"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EnquiryField from "@/components/Enquiry/EnquiryField.vue";

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
  codes: {
    type: Object,
    required: true,
  },
});

const form = defineModel({ type: Object });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.EnquiryPage {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: fns.gap(-0.5);
}

.Column {
  display: flex;
  flex-direction: column;
  width: calc(1% * var(--width));
  padding: fns.gap(0.5);
  gap: fns.gap(1);
}

.FieldGroup {
  @extend %clean-child-margins;
}

.Fields {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: fns.gap(-0.5);
}
</style>
