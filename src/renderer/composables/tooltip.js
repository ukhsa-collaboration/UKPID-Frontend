import { ref } from "vue";
import { useFloating, flip, autoUpdate, shift } from "@floating-ui/vue";

export const useTooltip = ({
  referenceEl,
  tooltipEl,
  tooltipPlacement = "bottom",
  delay = 250,
  tooltipShowCallback = null,
  tooltipHideCallback = null,
}) => {
  const tooltipVisible = ref(false);
  let showTimeout;

  const showTooltip = () => {
    if (showTimeout) return;

    showTimeout = setTimeout(() => {
      tooltipVisible.value = true;

      if (typeof tooltipShowCallback === "function") tooltipShowCallback();
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(showTimeout);
    showTimeout = null;
    tooltipVisible.value = false;
    if (typeof tooltipHideCallback === "function") tooltipHideCallback();
  };

  const { floatingStyles, placement } = useFloating(referenceEl, tooltipEl, {
    middleware: [flip(), shift()],
    placement: tooltipPlacement,
    whileElementsMounted: autoUpdate,
  });

  return {
    tooltipVisible,
    showTooltip,
    hideTooltip,
    floatingStyles,
    placement,
  };
};
