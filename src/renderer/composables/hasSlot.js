import { useSlots } from "vue";

export const useHasSlot = () => {
  const slots = useSlots();
  const hasSlot = (name) => {
    return !!slots[name];
  };

  return { hasSlot };
};
