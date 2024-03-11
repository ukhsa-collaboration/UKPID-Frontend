<template>
  <MainWindowPage>
    <h1>{{ $t("Dashboard") }}</h1>
    <UkpidButton appearance="accent" @click="hello">Hello!</UkpidButton>

    <div style="display: flex; gap: 8px">
      <UkpidSearchField size="small" />
      <UkpidSearchField size="medium" />
      <UkpidSearchField size="large" />
      <UkpidTextField size="small" value="test" />
      <UkpidTextField size="medium" value="test" />
      <UkpidTextField size="large" value="test" />
    </div>
    <p id="msg">
      {{ msg }}
    </p>

    <p>
      Lorem ipsum
      <router-link :to="{ name: 'enquiry' }">dolor alet</router-link>
      dsfsdfds
    </p>

    <span
      ref="tooltipTarget"
      :tabindex="0"
      aria-describedby="tooltip"
      @mouseover="tooltip.showTooltip"
      @mouseleave="tooltip.hideTooltip"
      @focusin="tooltip.showTooltip"
      @focusout="tooltip.hideTooltip"
    >
      Hover for a tooltip!
    </span>

    <UkpidTooltip
      v-show="tooltip.tooltipVisible"
      id="tooltip"
      ref="tooltipEl"
      :style="tooltip.floatingStyles"
      >This is the tooltip!
    </UkpidTooltip>
  </MainWindowPage>
</template>

<script setup>
import { ref, reactive } from "vue";
import MainWindowPage from "@/components/MainWindowPage.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidTooltip from "@/components/UkpidTooltip.vue";
import { useTooltip } from "@/composables/tooltip";
import { apiRequest } from "@/modules/apiRequest";
import UkpidTextField from "@/components/UkpidTextField.vue";
import UkpidSearchField from "@/components/UkpidSearchField.vue";

const msg = ref("Say hello");

const hello = async () => {
  try {
    msg.value = "loading";

    const user = (
      await apiRequest({
        key: "userApi",
        method: "me",
      })
    )?.data;

    msg.value = `Hello ${user.name}!`;
  } catch (e) {
    msg.value = `Failed to load: ${e.message || e}`;
    console.log(e);
  }
};

const tooltipTarget = ref(null);
const tooltipEl = ref(null);

const tooltip = reactive(
  useTooltip({
    referenceEl: tooltipTarget,
    tooltipEl,
    tooltipPlacement: "top",
  }),
);
</script>

<style lang="scss" scoped>
// tbc
</style>
