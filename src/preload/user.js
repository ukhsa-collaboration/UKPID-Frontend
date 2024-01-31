import { contextBridge, ipcRenderer } from "electron";

export const exposeUser = () => {
  contextBridge.exposeInMainWorld("user", {
    get: () => ipcRenderer.invoke("user:get"),
  });
};
