<template>
  <UkpidTextField
    v-model="model"
    class="UkpidSearchField"
    :placeholder="$t('Search')"
    v-bind="$attrs"
  >
    <template #start>
      <SearchIcon class="Icon" />
    </template>
    <slot>{{ $t("Search") }}</slot>
  </UkpidTextField>
</template>

<script setup>
import UkpidTextField from "@/components/UkpidTextField.vue";
import SearchIcon from "@fluentui/svg-icons/icons/search_20_regular.svg";

const model = defineModel({ type: null });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.UkpidSearchField::part(label) {
  @extend %visually-hidden;
}
</style>
