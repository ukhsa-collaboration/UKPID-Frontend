<template>
  <div class="TitleBar">
    <div class="TitleBarContent">
      <TitleBarTitle class="TitleBar__Title" :release-tag="releaseTag" />
      <TitleBarStatus class="TitleBar__Status" />
      <div class="TitleBar__User">Daniel Hart</div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import TitleBarTitle from "@/components/title-bar/TitleBarTitle.vue";
import TitleBarStatus from "@/components/title-bar/TitleBarStatus.vue";

const releaseTag = ref(null);

onBeforeMount(async () => {
  if (await window.ukpid.isDevelopment) releaseTag.value = "Development";
  else if (await window.ukpid.isTest) releaseTag.value = "Testing";
  else if (await window.ukpid.isPrerelease) releaseTag.value = "Preview";
  else if (await window.ukpid.isRelease) releaseTag.value = null;
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
  user-select: none;
  -webkit-app-region: drag;
}

.TitleBarContent {
  width: env(titlebar-area-width);
  height: 100%;
  left: env(titlebar-area-x);
  position: absolute;
  top: 0;
  display: grid;
  grid-template-areas: "title status user";
  grid-template-columns: minmax(max-content, 1fr) max-content max-content;
  gap: fns.gap(2);
  align-content: center;
  padding: 0 fns.gap(1);
}

.TitleBar__Title {
  grid-area: title;
}

.TitleBar__Status {
  grid-area: status;
}

.TitleBar__User {
  grid-area: user;
}
</style>
