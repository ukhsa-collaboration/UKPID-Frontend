import { contextBridge, ipcRenderer } from "electron";

export const exposeUserApi = () => {
  contextBridge.exposeInMainWorld("userApi", {
    me: () => ipcRenderer.invoke("api:user:me"),
  });
};
