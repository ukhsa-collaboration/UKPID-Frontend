import { contextBridge, ipcRenderer } from "electron";

export const exposeFormDefinition = () => {
  contextBridge.exposeInMainWorld("formDefinition", {
    get: () => ipcRenderer.invoke("formDefinition:get"),
    onUpdated: (callback) => ipcRenderer.on("formDefinition:updated", callback),
  });
};
