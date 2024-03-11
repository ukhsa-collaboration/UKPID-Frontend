<template>
  <div class="TitleBar">
    <div class="Content">
      <slot v-if="props.content">
        <TitleBarAppName
          class="AppName"
          :release-tag="releaseTag"
          :logo-only="props.logoOnly"
        >
          <slot name="title" />
        </TitleBarAppName>
        <TitleBarStatus
          v-if="props.showStatus"
          class="Status"
          :show-label="props.showStatusLabel"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useHasSlot } from "@/composables/hasSlot";
import TitleBarAppName from "@/components/TitleBar/TitleBarTitle.vue";
import TitleBarStatus from "@/components/TitleBar/TitleBarStatus.vue";

const props = defineProps({
  content: {
    type: Boolean,
    default: true,
  },
  showStatus: {
    type: Boolean,
    default: true,
  },
  showStatusLabel: {
    type: Boolean,
    default: true,
  },
  logoOnly: {
    type: Boolean,
    default: false,
  },
});

const { hasSlot } = useHasSlot();

const releaseTag = ref(null);

onBeforeMount(async () => {
  if (await window.environment.isDevelopment) releaseTag.value = "Development";
  else if (await window.environment.isTest) releaseTag.value = "Testing";
  else if (await window.environment.isPrerelease) releaseTag.value = "Preview";
  else if (await window.environment.isRelease) releaseTag.value = null;
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.TitleBar {
  position: absolute;
  top: env(titlebar-area-y);
  width: 100%;
  height: env(titlebar-area-height);
  background-color: var(--neutral-layer-2);
  -webkit-app-region: drag;
  font-size: min(16px, var(--type-ramp-base-font-size));
  line-height: min(22px, var(--type-ramp-base-line-height));
}

.Content {
  display: grid;
  position: absolute;
  top: 0;
  left: env(titlebar-area-x);
  grid-template-rows: 100%;
  grid-template-columns: max-content minmax(max-content, 1fr) max-content;
  grid-template-areas: "app-name title status";
  align-content: center;
  align-items: center;
  width: env(titlebar-area-width);
  height: 100%;
  padding: 0 fns.gap(1) 0 fns.gap(0.5);
  gap: fns.gap(2);
}

.AppName {
  grid-area: app-name;
}

.Title {
  grid-area: title;
}

.Status {
  grid-area: status;
}
</style>
