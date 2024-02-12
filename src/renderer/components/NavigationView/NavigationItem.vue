<template>
  <router-link
    v-slot="{ isExactActive }"
    class="NavigationItem"
    exact-active-class="NavigationItem--Current"
    :class="{
      'NavigationItem--Spin': props.spin,
    }"
    :to="{ name: props.route }"
  >
    <Transition>
      <div v-show="isExactActive" class="Indicator"></div>
    </Transition>
    <div class="Inner">
      <span class="Icon">
        <slot />
      </span>
      <span class="Label">{{ $t(props.labelTransKey) }}</span>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  route: {
    type: String,
    required: true,
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

  text-decoration: none;
  padding: 8px;
  border-radius: calc(1px * var(--control-corner-radius));
  position: relative;
  overflow: hidden;
  -webkit-user-drag: none;
  display: block;

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
      forced-color-adjust: none;
      background: highlight;
      color: highlighttext;
    }

    &::before {
      display: none;
    }
  }
}

.Indicator {
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
  .NavigationItem--Spin:active .Icon {
    transition: transform 0.2s linear;
    transform: rotate(-15deg);
    animation-name: none !important;
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
  opacity: var(--inner-opacity, 1);
  display: grid;
  gap: calc(var(--base-gap) * 0.75);
  align-items: center;
  grid-template-columns: 20px 1fr;
}

.Icon {
  justify-self: center;
}

.Icon::v-deep() svg {
  display: block;
  fill: currentColor;
}

.Label {
  font-size: min(20px, var(--type-ramp-base-font-size));
  line-height: min(26px, var(--type-ramp-base-line-height));
}
</style>
