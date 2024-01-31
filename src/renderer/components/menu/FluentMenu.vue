<template>
  <div
    ref="container"
    :class="{
      MenuAbove: placement?.startsWith('top'),
      MenuBelow: placement?.startsWith('bottom'),
    }"
  >
    <button
      ref="button"
      class="Button"
      :aria-label="props.buttonLabel"
      @click="toggleMenu"
    >
      <slot name="button" />
    </button>
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
import { ref, watch } from "vue";
import { useFloating, flip, autoUpdate } from "@floating-ui/vue";

const props = defineProps({
  placement: {
    type: String,
    default: "bottom-end",
  },
  buttonLabel: {
    type: String,
    default: null,
  },
});

const container = ref(null);
const button = ref(null);
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

watch(showMenu, (newValue, oldValue) => {
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
.Button {
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
  padding: 0;
  height: 100%;
  width: 100%;
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
