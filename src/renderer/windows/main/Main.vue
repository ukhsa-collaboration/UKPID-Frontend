<template>
  <div class="MainWindow">
    <TitleBar />
    <div class="MainWindowLayout">
      <SidebarNavigation class="SidebarNavigation" />
      <div class="WindowBody">
        <RouterView v-slot="{ Component, route }">
          <Transition
            name="custom-classes"
            :enter-from-class="transitions[transition].enterFromClass"
            :enter-active-class="transitions[transition].enterActiveClass"
            :leave-active-class="transitions[transition].leaveActiveClass"
            :leave-to-class="transitions[transition].leaveToClass"
          >
            <component
              :is="Component"
              :key="route.matched[0]?.path ?? route.path"
            />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleBar from "@/components/TitleBar/TitleBar.vue";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation.vue";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "@/stores/user";
import transitions from "@/modules/transitions";

const userStore = useUserStore();

onBeforeMount(async () => {
  try {
    await userStore.requestAndSetUser();
  } catch (e) {}
});

const transition = ref("entrance");
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.MainWindowLayout {
  position: absolute;
  top: env(titlebar-area-height);
  left: 0;
  width: 100%;
  height: calc(100% - env(titlebar-area-height));
  overflow: hidden;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar-navigation body";
}

.SidebarNavigation {
  grid-area: sidebar-navigation;
}

.WindowBody {
  grid-area: body;
  position: relative;
  border-top-left-radius: calc(var(--layer-corner-radius) * 1px);
  background-color: var(--fill-color);
  border-top: 1px solid var(--neutral-stroke-active);
  border-left: 1px solid var(--neutral-stroke-active);
  overflow: hidden;
}
</style>
