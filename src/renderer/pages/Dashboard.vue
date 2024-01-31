<template>
  <MainWindowPage>
    <h1>{{ $t("Dashboard") }}</h1>
    <FluentButton appearance="accent" @click="hello">Hello!</FluentButton>

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

    <FluentTooltip
      v-show="tooltipVisible"
      id="tooltip"
      ref="tooltip"
      :style="floatingStyles"
      >This is the tooltip!
    </FluentTooltip>
  </MainWindowPage>
</template>

<script setup>
import { ref } from "vue";
import MainWindowPage from "@/components/MainWindowPage.vue";
import FluentButton from "@/components/FluentButton.vue";
import FluentTooltip from "@/components/FluentTooltip.vue";
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
const tooltip = ref(null);

const { tooltipVisible, showTooltip, hideTooltip, floatingStyles } = useTooltip(
  tooltipTarget,
  tooltip,
);
</script>

<style lang="scss">
// tbc
</style>
