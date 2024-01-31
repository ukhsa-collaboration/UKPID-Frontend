import { contextBridge, ipcRenderer } from "electron";

export const exposeNetwork = () => {
  contextBridge.exposeInMainWorld("network", {
    connect: () => ipcRenderer.send("network:connect"),
    disconnect: () => ipcRenderer.send("network:disconnect"),
  });
};
