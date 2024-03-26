import { contextBridge, ipcRenderer } from "electron";

export const exposeCodes = () => {
  contextBridge.exposeInMainWorld("codes", {
    getCodes: () => ipcRenderer.invoke("codes:getCodes"),
  });
};
