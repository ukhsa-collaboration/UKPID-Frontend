<template>
  <div
    ref="container"
    class="UkpidMenu"
    :class="{
      MenuAbove: placement?.startsWith('top'),
      MenuBelow: placement?.startsWith('bottom'),
    }"
  >
    <UkpidButton
      ref="button"
      class="Button"
      aria-describedby="buttonTooltip"
      :size="props.buttonSize"
      :slim="props.slimButton"
      :appearance="props.buttonAppearance"
      @mouseover="buttonTooltip.showTooltip"
      @mouseleave="buttonTooltip.hideTooltip"
      @focusin="buttonTooltip.showTooltip"
      @focusout="buttonTooltip.hideTooltip"
      @click.prevent="toggleMenu"
    >
      <slot name="button" />
    </UkpidButton>
    <UkpidTooltip
      v-show="!showMenu && buttonTooltip.tooltipVisible"
      id="buttonTooltip"
      ref="buttonTooltipEl"
      :style="buttonTooltip.floatingStyles"
      >{{ props.tooltip }}
    </UkpidTooltip>
    <Transition
      name="custom-classes"
      enter-from-class="MenuEnterFrom"
      enter-active-class="MenuEnterActive"
      leave-active-class="MenuLeaveActive"
      leave-to-class="MenuLeaveTo"
    >
      <fluent-menu
        v-if="showMenu"
        ref="menu"
        class="Menu"
        :style="floatingStyles"
      >
        <slot name="menu" />
      </fluent-menu>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useFloating, flip, autoUpdate } from "@floating-ui/vue";
import { useTooltip } from "@/composables/tooltip";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidTooltip from "@/components/UkpidTooltip.vue";

const props = defineProps({
  placement: {
    type: String,
    default: "bottom-end",
  },
  tooltip: {
    type: String,
    required: true,
  },
  buttonSize: {
    type: String,
    default: "medium",
  },
  buttonAppearance: {
    type: String,
    default: "transparent",
  },
  slimButton: {
    type: Boolean,
    default: false,
  },
});

const container = ref(null);

const button = ref(null);
const buttonTooltipEl = ref(null);

const buttonTooltip = reactive(
  useTooltip({
    referenceEl: button,
    tooltipEl: buttonTooltipEl,
    tooltipPlacement: "top",
  }),
);

const menu = ref(null);
const showMenu = ref(false);

const { floatingStyles, placement } = useFloating(button, menu, {
  middleware: [flip()],
  placement: props.placement,
  whileElementsMounted: autoUpdate,
});

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    showMenu.value = false;
  }
};

const handleEscKey = (event) => {
  if (event.key === "Escape") {
    showMenu.value = false;
  }
};

watch(showMenu, (newValue) => {
  if (newValue) {
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscKey);
  } else {
    window.removeEventListener("click", handleClickOutside);
    window.removeEventListener("keydown", handleEscKey);
  }
});
</script>

<style lang="scss" scoped>
.UkpidMenu {
  display: inline-flex;
}

.Button {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.Menu {
  z-index: 9999;
}

.MenuEnterFrom {
  opacity: 0;
}

.MenuBelow .MenuEnterFrom {
  top: -20px !important;
}

.MenuAbove .MenuEnterFrom {
  top: 20px !important;
}

.MenuEnterActive {
  transition: 0.2s cubic-bezier(0, 0, 0, 1);
  transition-property: opacity, top;
}
</style>
