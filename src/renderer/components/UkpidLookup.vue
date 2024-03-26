<template>
  <div class="UkpidLookup">
    <UkpidLabel v-if="hasSlot('default')" :for="select?.id">
      <slot />
    </UkpidLabel>
    <UkpidTextField
      v-model="textValue"
      @keydown="maybeOpenDialog"
      @dblclick="dialog?.open"
    />

    <UkpidDialog ref="dialog" @close="closed">
      <template #title><slot /></template>
      <template #content>
        <UkpidSearchField
          v-model="filter"
          class="Search"
          @keydown.enter="confirm"
          @keyup="selectOption"
        />
        <UkpidSelect
          v-model="selected"
          :size="Object.keys(props.values).length"
          class="Listbox"
          @keyup.enter="confirm"
        >
          <option value="" hidden />
          <UkpidOption
            v-for="(label, value) in props.values"
            :key="value"
            :value="value"
            :data-value="value"
            @dblclick="confirm"
          >
            {{ label }}
          </UkpidOption>
        </UkpidSelect>
      </template>
    </UkpidDialog>
  </div>
</template>

<script setup>
import UkpidLabel from "@/components/UkpidLabel.vue";
import { ref } from "vue";
import { useHasSlot } from "@/composables/hasSlot";
import UkpidTextField from "@/components/UkpidTextField.vue";
import UkpidDialog from "@/components/Dialog/UkpidDialog.vue";
import UkpidSearchField from "@/components/UkpidSearchField.vue";
import UkpidOption from "@/components/UkpidOption.vue";
import UkpidSelect from "@/components/UkpidSelect.vue";

const props = defineProps({
  values: {
    type: Object,
    required: true,
  },
  autoWidth: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: null });

const { hasSlot } = useHasSlot();

const dialog = ref(null);
const select = ref(null);

const textValue = ref("");
const filter = ref("");
const selected = ref("");

/**
 * Reduce the values prop to only include items where the property starts with the value of filter.
 */
const filterValues = () => {
  // Check if filter is empty, return all values if true
  if (!filter.value) {
    return props.values;
  }

  // Filter the props.values object based on the filter criteria
  return Object.entries(props.values).reduce((acc, [key, label]) => {
    // Check if label starts with the filter value (case insensitive)
    if (label.toLowerCase().startsWith(filter.value.toLowerCase())) {
      // If it matches, add it to the accumulator object
      acc[key] = label;
    }
    return acc;
  }, {});
};

/**
 * Select the first values prop item which starts with the value of filter.
 */
const selectOption = () => {
  selected.value = filter.value ? Object.keys(filterValues())[0] ?? "" : "";

  if (selected.value) {
    dialog.value.dialog
      .querySelector(`fluent-option[data-value="${selected.value}"]`)
      .scrollIntoViewIfNeeded();
  }
};

/**
 * Open the dialog if the key pressed is a character or backspace/delete
 */
const maybeOpenDialog = (ev) => {
  // Ignore Ctrl/Alt/Cmd/Super modifiers
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;

  // Ignore non-character and backspace/delete keys
  if (ev.key.length !== 1 && !["Backspace", "Delete"].includes(ev.key)) {
    return;
  }

  // If character, set the filter value with the pressed key
  if (ev.key.length === 1) {
    filter.value = ev.key;
  }

  dialog.value?.open();
  selectOption();
};

const confirm = () => {
  dialog.value?.confirm();
};

/**
 * Fires when the dialog is closed.
 *
 * Clear the filter value, and set the field displayed on the form to the selected value label, and the v-model for this component to the selected value.
 */
const closed = () => {
  filter.value = "";

  if (dialog.value.dialog.returnValue) {
    textValue.value = props.values[selected.value];
    model.value = selected.value;
  } else {
    textValue.value = "";
  }
};
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.UkpidLookup {
  display: inline-flex;
  flex-direction: column;
}

.UkpidLookup :deep(.Main) {
  display: flex;
  flex-direction: column;
}

.Listbox {
  overflow: hidden;
}

.Listbox :deep(.Select) {
  overflow: auto;
}

.Listbox ::part(listbox) {
  position: relative;
  background:
    padding-box
      linear-gradient(
        var(--neutral-fill-input-rest),
        var(--neutral-fill-input-rest)
      ),
    border-box var(--neutral-stroke-input-rest);
  box-shadow: none;
}

.Search {
  width: 100%;
  margin-bottom: fns.gap(1);
}
</style>
