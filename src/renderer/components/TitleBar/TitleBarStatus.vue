<template>
  <div class="TitleBarStatus">
    <StatusIndicator
      ref="indicator"
      class="Status"
      :status="connection.status"
      :show-label="props.showLabel"
      :tabindex="hasTooltip ? 0 : -1"
      aria-describedby="status-tooltip"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      @focusin="showTooltip"
      @focusout="hideTooltip"
    >
      {{ states[connection.status].label }}
    </StatusIndicator>
    <UkpidTooltip
      v-show="tooltipVisible && hasTooltip"
      id="status-tooltip"
      ref="tooltipEl"
      :style="floatingStyles"
      >{{ states[connection.status].description }}</UkpidTooltip
    >
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTooltip } from "@/composables/tooltip";
import StatusIndicator from "@/components/StatusIndicator.vue";
import UkpidTooltip from "@/components/UkpidTooltip.vue";
import { useConnectionStore } from "@/stores/connection";

const props = defineProps({
  showLabel: {
    type: Boolean,
    default: true,
  },
});

const { t } = useI18n();

const states = {
  connected: { label: t("Connected") },
  connecting: { label: t("Connecting") },
  disconnected: {
    label: t("Offline"),
    description: t(
      "Unable to connect to the UKPID server. Any data saved while offline will be automatically synced when the connection is restored.",
    ),
  },
};

const connection = useConnectionStore();
const indicator = ref(null);
const tooltipEl = ref(null);

const { tooltipVisible, showTooltip, hideTooltip, floatingStyles, placement } =
  useTooltip({ referenceEl: indicator, tooltipEl });

const hasTooltip = computed(() => {
  return !!states[connection.status]?.description;
});
</script>

<style lang="scss" scoped>
.TitleBarStatus {
  -webkit-app-region: no-drag;
}

.Status {
  height: 100%;
}
</style>
