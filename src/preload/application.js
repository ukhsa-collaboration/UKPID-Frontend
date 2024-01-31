import { contextBridge, ipcRenderer } from "electron";

export const exposeApplication = () => {
  contextBridge.exposeInMainWorld("application", {
    launch: (user) => ipcRenderer.send("application:launch", user),
    logout: () => ipcRenderer.send("application:logout"),
  });
};
