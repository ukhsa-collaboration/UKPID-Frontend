<template>
  <MainWindowPage class="Page">
    <UkpidOffline v-if="!props.worksOffline && !isConnected()" />
    <div v-else class="NavigationView">
      <div class="NavigationHeader">
        <slot name="navigation-header">
          <NavigationTitle><slot name="navigation-title" /></NavigationTitle>
        </slot>
      </div>
      <div class="NavigationFrame">
        <div class="NavigationItems">
          <slot name="navigation-items-top" />
        </div>
        <div class="NavigationItems">
          <slot name="navigation-items-bottom" />
        </div>
      </div>
      <RouterView v-slot="{ Component, route }">
        <Transition
          name="custom-classes"
          :enter-from-class="transitions[transition].enterFromClass"
          :enter-active-class="transitions[transition].enterActiveClass"
          :leave-active-class="transitions[transition].leaveActiveClass"
          :leave-to-class="transitions[transition].leaveToClass"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </MainWindowPage>
</template>

<script setup>
import { ref } from "vue";
import transitions from "@/modules/transitions";
import MainWindowPage from "@/components/MainWindowPage.vue";
import UkpidOffline from "@/components/UkpidOffline.vue";
import { useConnectionStore } from "@/stores/connection";
import NavigationTitle from "@/components/NavigationView/NavigationTitle.vue";

const props = defineProps({
  worksOffline: {
    type: Boolean,
    default: true,
  },
});

const transition = ref("entrance");
const { isConnected } = useConnectionStore();
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.Page {
  padding-right: 0;
  padding-bottom: 0;
}

.NavigationView {
  display: grid;
  position: relative;
  grid-template-rows: max-content 1fr;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "navigation-header content"
    "navigation-frame content";
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: fns.gap(1) var(--page-gap);
}

.NavigationHeader {
  @extend %clean-child-margins;

  grid-area: navigation-header;
}

.NavigationFrame {
  @extend %clean-child-margins;
  display: flex;

  grid-area: navigation-frame;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: var(--page-gap);
  overflow: auto;
  gap: fns.gap(0.25);
}

.NavigationItems {
  display: flex;
  flex-direction: column;
  gap: fns.gap(0.25);
}
</style>
