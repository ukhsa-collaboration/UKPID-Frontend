<template>
  <div class="PopoutWindow">
    <TitleBar :show-status-label="false">
      <template #title>{{ windowTitle }}</template>
    </TitleBar>
    <div class="WindowBody">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import TitleBar from "@/components/TitleBar/TitleBar.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { t } = useI18n();
const { router } = useRouter();

const transition = ref("entrance");
const windowTitle = ref("");

const setupWindow = async () => {
  const win = await window.popout.getDetails();
  console.log(win);

  if (win?.type === "enquiry") {
    windowTitle.value = t("Enquiry #{id}", { id: win.id });
  }
};

onBeforeMount(async () => {
  try {
    await userStore.requestAndSetUser();
    await setupWindow();
  } catch (e) {}
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.WindowBody {
  position: absolute;
  top: env(titlebar-area-height);
  left: 0;
  width: 100%;
  height: calc(100% - env(titlebar-area-height));
  overflow: auto;
  background-color: var(--fill-color);
  border-top: 1px solid var(--neutral-stroke-active);
  padding-top: var(--page-gap);
  padding-left: var(--page-gap);
}
</style>
