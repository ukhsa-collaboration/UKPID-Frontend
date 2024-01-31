import { contextBridge, ipcRenderer } from "electron";

export const exposeAuth = () => {
  contextBridge.exposeInMainWorld("auth", {
    login: () => ipcRenderer.send("auth:login"),
    isLoginRequired: () => ipcRenderer.invoke("auth:isLoginRequired"),
    getAccessToken: () => ipcRenderer.invoke("auth:getAccessToken"),
    onAuthenticated: (callback) =>
      ipcRenderer.on("auth:authenticated", callback),
    onFailedToLoad: (callback) => ipcRenderer.on("auth:failedToLoad", callback),
    onAuthWindowClosed: (callback) =>
      ipcRenderer.on("auth:windowClosed", callback),
  });
};
