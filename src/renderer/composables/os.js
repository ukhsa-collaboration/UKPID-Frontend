import { onBeforeMount, ref } from "vue";

export const useOS = () => {
  const isWindows = ref(false);
  const isMac = ref(false);
  const isLinux = ref(false);

  onBeforeMount(async () => {
    isWindows.value = await window.environment.isWindows;
    isMac.value = await window.environment.isMac;
    isLinux.value = await window.environment.isLinux;
  });

  return {
    isWindows,
    isMac,
    isLinux,
  };
};
