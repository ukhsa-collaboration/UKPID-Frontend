<template>
  <dialog ref="dialog" class="UkpidDialog">
    <div class="Main">
      <div v-if="hasSlot('title')" class="Title Subtitle1">
        <slot name="title" />
      </div>
      <slot name="content" />
    </div>
    <div class="Footer">
      <slot name="footer">
        <div class="FooterButtons">
          <UkpidButton @click.stop="confirm"
            ><slot name="confirm-button">{{ $t("Ok") }}</slot></UkpidButton
          >
          <UkpidButton appearance="neutral" @click.stop="close"
            ><slot name="cancel-button">{{ $t("Cancel") }}</slot></UkpidButton
          >
        </div>
      </slot>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import UkpidButton from "@/components/UkpidButton.vue";
import { useHasSlot } from "@/composables/hasSlot";

const { hasSlot } = useHasSlot();

const dialog = ref(null);

const open = () => {
  dialog.value.showModal();
  dialog.value.returnValue = "";
};

const close = () => {
  dialog.value.close();
};

const confirm = () => {
  dialog.value.returnValue = "true";
  close();
};

defineExpose({ dialog, open, close, confirm });
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.UkpidDialog {
  z-index: 1;
  grid-template-rows: 1fr max-content;
  grid-template-areas:
    "main"
    "footer";
  min-width: 320px;
  max-width: min(calc(100% - var(--page-gap) * 2), 45rem);
  max-height: calc(100% - var(--page-gap) * 2 - env(titlebar-area-height) * 2);
  margin-top: auto;
  margin-bottom: auto;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: calc(var(--layer-corner-radius) * 1px);
  background: var(--fill-color);
  box-shadow: var(--elevation-shadow-dialog);
}

.UkpidDialog[open] {
  display: grid;
}

.Title {
  margin-top: 0;
  margin-bottom: 1rem;
}

.Main {
  @extend %clean-child-margins;

  grid-area: main;
  padding: fns.gap(1.5);
  overflow: auto;
}

.Footer {
  grid-area: footer;
  padding: fns.gap(1.5);
  border-top: 1px solid var(--neutral-stroke-rest);
  background: var(--neutral-layer-2);
}

.FooterButtons {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: fns.gap(0.5);
}
</style>
