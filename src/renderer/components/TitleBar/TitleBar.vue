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
  background-color: var(--neutral-layer-2);
  height: env(titlebar-area-height);
  position: absolute;
  top: env(titlebar-area-y);
  width: 100%;
  -webkit-app-region: drag;
  font-size: min(16px, var(--type-ramp-base-font-size));
  line-height: min(22px, var(--type-ramp-base-line-height));
}

.Content {
  width: env(titlebar-area-width);
  height: 100%;
  left: env(titlebar-area-x);
  position: absolute;
  top: 0;
  display: grid;
  grid-template-areas: "app-name title status";
  grid-template-columns: max-content minmax(max-content, 1fr) max-content;
  grid-template-rows: 100%;
  gap: fns.gap(2);
  align-content: center;
  align-items: center;
  padding: 0 fns.gap(1) 0 fns.gap(0.5);
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
