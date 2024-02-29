import { contextBridge, ipcRenderer } from "electron";

export const exposeAuditSettings = () => {
  contextBridge.exposeInMainWorld("auditSettings", {
    setSplit: (value) => ipcRenderer.send("settings:audit:setSplit", value),
    getSplit: () => ipcRenderer.invoke("settings:audit:getSplit"),
  });
};
