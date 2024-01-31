import { contextBridge, ipcRenderer } from "electron";

export const exposeStatusApi = () => {
  contextBridge.exposeInMainWorld("statusApi", {
    status: () => ipcRenderer.invoke("api:status:status"),
  });
};
