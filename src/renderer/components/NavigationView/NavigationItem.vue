<template>
  <router-link
    v-slot="{ isExactActive }"
    class="NavigationItem"
    exact-active-class="NavigationItem--Current"
    :class="{
      'NavigationItem--Spin': props.spin,
    }"
    :to="{ name: props.route, params: props.routeParams }"
  >
    <Transition>
      <div v-show="isExactActive" class="Indicator"></div>
    </Transition>
    <slot name="content">
      <div class="Inner">
        <span class="Icon">
          <slot />
        </span>
        <span class="Label">{{ $t(props.labelTransKey) }}</span>
      </div>
    </slot>
  </router-link>
</template>

<script setup>
const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  routeParams: {
    type: Object,
    default: () => ({}),
  },
  spin: {
    type: Boolean,
    default: false,
  },
  labelTransKey: {
    type: String,
    default: (rawProps) => `routes.${rawProps.route}`,
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.NavigationItem {
  @extend %focus-styles;

  --link-color: var(--neutral-foreground-rest);
  --link-color-hover: var(--neutral-foreground-rest);
  --link-color-active: var(--neutral-foreground-rest);
  padding: fns.gap(0.5);
  border-radius: calc(1px * var(--control-corner-radius));

  text-decoration: none;
  -webkit-user-drag: none;
  display: grid;
  grid-template-columns: 0 1fr;
  grid-template-areas: "indicator inner";

  &:hover,
  &:focus-visible {
    background: var(--nav-view-nav-item-background-hover);
  }

  &:active {
    --inner-opacity: 0.775;

    background: var(--nav-view-nav-item-background-active);
  }

  @media (forced-colors: active) {
    border: 1px solid #000;
  }
}

.NavigationItem--Current {
  background: var(--nav-view-nav-item-background-hover);

  &:hover,
  &:focus-visible {
    background: var(--nav-view-nav-item-background-active);
  }

  &:active {
    --inner-opacity: 0.775;

    background: var(--nav-view-nav-item-background-hover);
  }

  @media (forced-colors: active) {
    &:not(:hover),
    &:not(:focus-visible) {
      background: highlight;
      color: highlighttext;
      forced-color-adjust: none;
    }

    &::before {
      display: none;
    }
  }
}

.Indicator {
  grid-area: indicator;
  width: 0;
  transform: translateX(fns.gap(-0.5));
  border-right: 2px solid var(--accent-fill-rest);
  border-left: 1px solid var(--accent-fill-rest);
  border-radius: calc(1px * var(--control-corner-radius));
}

@media screen and (prefers-reduced-motion: no-preference) {
  .NavigationItem--Spin:active .Icon {
    transform: rotate(-15deg);
    animation-name: none !important;
    transition: transform 0.2s linear;
  }

  .NavigationItem--Current.NavigationItem--Spin .Icon {
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

.Inner {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-area: inner;
  align-items: center;
  gap: calc(var(--base-gap) * 0.75);
  opacity: var(--inner-opacity, 1);
}

.Icon {
  justify-self: center;
}

.Icon:deep(svg) {
  display: block;
  fill: currentColor;
}

.Label {
  font-size: min(20px, var(--type-ramp-base-font-size));
  line-height: min(26px, var(--type-ramp-base-line-height));
}
</style>
