import { contextBridge, ipcRenderer } from "electron";

export const exposeConnection = () => {
  contextBridge.exposeInMainWorld("connection", {
    onStatus: (callback) => ipcRenderer.on("connection:status", callback),
    getStatus: () => ipcRenderer.invoke("connection:getStatus"),
  });
};
