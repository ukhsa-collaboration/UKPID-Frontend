<template>
  <MainWindowPage class="Page">
    <div class="NavigationView">
      <div class="NavigationHeader">
        <h1 class="Title2"><slot name="navigation-title" /></h1>
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
          <component
            :is="Component"
            :key="route.matched[1]?.path ?? route.path"
          />
        </Transition>
      </RouterView>
    </div>
  </MainWindowPage>
</template>

<script setup>
import MainWindowPage from "@/components/MainWindowPage.vue";
import transitions from "@/modules/transitions";
import { ref } from "vue";

const transition = ref("entrance");
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.Page {
  padding-right: 0;
  padding-bottom: 0;
}

.NavigationView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    "navigation-header content-header"
    "navigation-frame content-body";
  grid-template-columns: 200px 1fr;
  grid-template-rows: max-content 1fr;
  gap: fns.gap(1) var(--page-gap);
  position: relative;
}

.NavigationHeader {
  @extend %clean-child-margins;

  grid-area: navigation-header;
}

.NavigationFrame {
  @extend %clean-child-margins;

  grid-area: navigation-frame;
  display: flex;
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
