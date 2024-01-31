import { defineStore } from "pinia";
import { ref } from "vue";

export const useConnectionStore = defineStore("connection", () => {
  const status = ref("disconnected");

  window.connection.getStatus().then((connStatus) => {
    console.log("getStatus", connStatus);

    status.value = connStatus;
  });

  window.connection.onStatus((_event, connStatus) => {
    console.log("onStatus", connStatus);
    status.value = connStatus;
  });

  return {
    status,
  };
});
