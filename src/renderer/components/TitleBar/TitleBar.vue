<template>
  <div class="TitleBar">
    <div class="Content">
      <slot v-if="props.content">
        <TitleBarTitle class="Title" :release-tag="releaseTag" />
        <TitleBarStatus class="Status" />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import TitleBarTitle from "@/components/TitleBar/TitleBarTitle.vue";
import TitleBarStatus from "@/components/TitleBar/TitleBarStatus.vue";
import TitleBarUser from "@/components/TitleBar/TitleBarUser.vue";

const props = defineProps({
  content: {
    type: Boolean,
    default: true,
  },
});

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
  grid-template-areas: "title status";
  grid-template-columns: minmax(max-content, 1fr) max-content;
  grid-template-rows: 100%;
  gap: fns.gap(2);
  align-content: center;
  padding: 0 fns.gap(1) 0 fns.gap(0.5);
}

.Title {
  grid-area: title;
}

.Status {
  grid-area: status;
}
</style>
