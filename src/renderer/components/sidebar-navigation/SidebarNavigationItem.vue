<template>
  <router-link
    class="SidebarNavigationItem"
    :class="{
      'SidebarNavigationItem--Current': isCurrent,
      'SidebarNavigationItem--Spin': props.spin,
    }"
    :to="{ name: props.route }"
  >
    <Transition>
      <div v-show="isCurrent" class="SidebarNavigationItem__Indicator"></div>
    </Transition>
    <div class="SidebarNavigationItem__Inner">
      <span class="SidebarNavigationItem__Icon">
        <slot />
      </span>
      <span class="SidebarNavigationItem__Label">{{
        $t(`routes.${props.route}`)
      }}</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  spin: {
    type: Boolean,
    default: false,
  },
});

const currentRoute = useRoute();

const isCurrent = computed(() => {
  return currentRoute?.name === props.route;
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/mixins";
@use "@/scss/abstracts/functions" as fns;

.SidebarNavigationItem {
  --link-color: var(--neutral-foreground-rest);
  --link-color-hover: var(--neutral-foreground-rest);
  --link-color-active: var(--neutral-foreground-rest);

  text-decoration: none;
  padding: 10px;
  margin: fns.gap(0.25);
  border-radius: calc(1px * var(--control-corner-radius));
  position: relative;
  overflow: hidden;
  -webkit-user-drag: none;
  display: block;

  &:hover,
  &:focus-visible {
    background: var(--sidebar-nav-background-hover);
  }

  &:active {
    --inner-opacity: 0.775;

    background: var(--sidebar-nav-background-active);
  }

  @media (forced-colors: active) {
    border: 1px solid #000;
  }
}

.SidebarNavigationItem--Current {
  background: var(--sidebar-nav-background-hover);

  &:hover,
  &:focus-visible {
    background: var(--sidebar-nav-background-active);
  }

  &:active {
    --inner-opacity: 0.775;

    background: var(--sidebar-nav-background-hover);
  }

  @media (forced-colors: active) {
    &:not(:hover),
    &:not(:focus-visible) {
      forced-color-adjust: none;
      background: highlight;
      color: highlighttext;
    }

    &::before {
      display: none;
    }
  }
}

.SidebarNavigationItem__Indicator {
  width: 0;
  height: calc(100% - 20px);
  border-left: 1px solid var(--accent-fill-rest);
  border-right: 2px solid var(--accent-fill-rest);
  position: absolute;
  top: 10px;
  left: 0;
  border-radius: calc(1px * var(--control-corner-radius));
}

@media screen and (prefers-reduced-motion: no-preference) {
  .SidebarNavigationItem--Spin:active .SidebarNavigationItem__Icon {
    transition: transform 0.2s linear;
    transform: rotate(-15deg);
    animation-name: none !important;
  }

  .SidebarNavigationItem--Current.SidebarNavigationItem--Spin
    .SidebarNavigationItem__Icon {
    animation: full-spin 0.5s cubic-bezier(0, 0, 0, 1);
  }

  @keyframes full-spin {
    from {
      transform: rotate(-15deg);
    }

    to {
      transform: rotate(300deg);
    }
  }
}

.SidebarNavigationItem__Inner {
  opacity: var(--inner-opacity, 1);
  display: flex;
  gap: fns.gap(0.25);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.SidebarNavigationItem__Icon::v-deep() svg {
  display: block;
  fill: currentColor;
}

.SidebarNavigationItem__Label {
  font-size: var(--type-ramp-minus-2-font-size);
  line-height: var(--type-ramp-minus-2-line-height);
}
</style>
