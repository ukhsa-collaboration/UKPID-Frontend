<template>
  <MainWindowPage>
    <h1>{{ $t("Dashboard") }}</h1>
    <UkpidButton appearance="accent" @click="hello">Hello!</UkpidButton>

    <p id="msg">
      {{ msg }}
    </p>

    <p>
      Lorem ipsum
      <router-link :to="{ name: 'enquiries' }">dolor alet</router-link>
      dsfsdfds
    </p>

    <span
      ref="tooltipTarget"
      :tabindex="0"
      aria-describedby="tooltip"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      @focusin="showTooltip"
      @focusout="hideTooltip"
    >
      Hover for a tooltip!
    </span>

    <UkpidTooltip
      v-show="tooltipVisible"
      id="tooltip"
      ref="tooltipEl"
      :style="floatingStyles"
      >This is the tooltip!
    </UkpidTooltip>
  </MainWindowPage>
</template>

<script setup>
import { ref } from "vue";
import MainWindowPage from "@/components/MainWindowPage.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidTooltip from "@/components/UkpidTooltip.vue";
import { useTooltip } from "@/composables/tooltip";
import { apiRequest } from "@/modules/apiRequest";

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

const { tooltipVisible, showTooltip, hideTooltip, floatingStyles } = useTooltip(
  {
    referenceEl: tooltipTarget,
    tooltipEl,
  },
);
</script>

<style lang="scss" scoped>
// tbc
</style>
