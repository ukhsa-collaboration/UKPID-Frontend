<template>
  <div>
    <TitleBar />
    <div class="MainWindowLayout">
      <SidebarNavigation class="MainWindowLayout__SidebarNavigation" />
      <div class="MainWindowLayout__Body AppBody">
        <router-view v-slot="{ Component, route }">
          <transition
            name="custom-classes"
            :enter-from-class="transitions[transition].enterFromClass"
            :enter-active-class="transitions[transition].enterActiveClass"
            :leave-active-class="transitions[transition].leaveActiveClass"
            :leave-to-class="transitions[transition].leaveToClass"
          >
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleBar from "@/components/title-bar/TitleBar.vue";
import SidebarNavigation from "@/components/sidebar-navigation/SidebarNavigation.vue";
import { ref } from "vue";

const transitions = {
  entrance: {
    enterFromClass: "EntranceEnterFrom",
    enterActiveClass: "EntranceEnterActive",
    leaveActiveClass: "EntranceLeaveActive",
    leaveToClass: "EntranceLeaveTo",
  },
  drillIn: {
    enterFromClass: "DrillInEnterFrom",
    enterActiveClass: "DrillInEnterActive",
    leaveActiveClass: "DrillInLeaveActive",
    leaveToClass: "DrillInLeaveTo",
  },
  drillOut: {
    enterFromClass: "DrillOutEnterFrom",
    enterActiveClass: "DrillOutEnterActive",
    leaveActiveClass: "DrillOutLeaveActive",
    leaveToClass: "DrillOutLeaveTo",
  },
};

const transition = ref("entrance");
</script>

<style lang="scss">
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

.MainWindowLayout__TitleBar {
  grid-area: title-bar;
}

.MainWindowLayout__SidebarNavigation {
  grid-area: sidebar-navigation;
}

.MainWindowLayout__Body {
  grid-area: body;
}

.AppBody {
  position: relative;
  padding: fns.gap(1);
  border-top-left-radius: calc(var(--layer-corner-radius) * 1px);
  background-color: var(--fill-color);
  border-top: 1px solid var(--neutral-stroke-active);
  border-left: 1px solid var(--neutral-stroke-active);
  overflow: hidden;
}

@media screen and (prefers-reduced-motion: no-preference) {
  // Fade out, slide in
  .EntranceLeaveActive {
    transition: all 0.2s cubic-bezier(0, 0, 0, 1);
  }

  .EntranceLeaveTo {
    opacity: 0;
  }

  .EntranceEnterActive {
    transition: all 0.1s cubic-bezier(0, 0, 0, 1) 0.2s;
  }

  .EntranceEnterFrom {
    top: 50px !important;
    height: calc(100% - 50px) !important;
    opacity: 0;
  }

  // Grow out, grow + fade in
  .DrillInLeaveActive {
    transition: all 0.1s cubic-bezier(0, 0, 0, 1);
  }

  .DrillInLeaveTo {
    transform: scale(1.05);
    opacity: 0;
  }

  .DrillInEnterActive {
    transition: all 0.1s cubic-bezier(0, 0, 0, 1) 0.1s;
  }

  .DrillInEnterFrom {
    transform: scale(0.95);
    opacity: 0;
  }

  // Shrink out, shrink + fade in
  .DrillOutLeaveActive {
    transition: all 0.1s cubic-bezier(0, 0, 0, 1);
  }

  .DrillOutLeaveTo {
    transform: scale(0.95);
    opacity: 0;
  }

  .DrillOutEnterActive {
    transition: all 0.1s cubic-bezier(0, 0, 0, 1) 0.1s;
  }

  .DrillOutEnterFrom {
    transform: scale(1.05);
    opacity: 0;
  }
}
</style>
