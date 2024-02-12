import { contextBridge, ipcRenderer } from "electron";

export const exposeSettings = () => {
  contextBridge.exposeInMainWorld("settings", {
    setTheme: (value) => ipcRenderer.send("settings:setTheme", value),
    getTheme: () => ipcRenderer.invoke("settings:getTheme"),
    setTextSize: (value) => ipcRenderer.send("settings:setTextSize", value),
    getTextSize: () => ipcRenderer.invoke("settings:getTextSize"),
    onTextSize: (callback) =>
      ipcRenderer.on("settings:textSizeChanged", callback),
  });
};
