import { defineStore } from "pinia";
import { ref } from "vue";

export const useConnectionStore = defineStore("connection", () => {
  const status = ref("disconnected");

  window.connection.getStatus().then((connStatus) => {
    status.value = connStatus;
  });

  window.connection.onStatus((_event, connStatus) => {
    status.value = connStatus;
  });

  const isConnected = () => status.value === "connected";

  return {
    status,
    isConnected,
  };
});
