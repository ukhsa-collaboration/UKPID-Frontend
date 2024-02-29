import { contextBridge, ipcRenderer } from "electron";

export const exposeAppearanceSettings = () => {
  contextBridge.exposeInMainWorld("appearanceSettings", {
    setTheme: (value) =>
      ipcRenderer.send("settings:appearance:setTheme", value),
    getTheme: () => ipcRenderer.invoke("settings:appearance:getTheme"),
    setTextSize: (value) =>
      ipcRenderer.send("settings:appearance:setTextSize", value),
    getTextSize: () => ipcRenderer.invoke("settings:appearance:getTextSize"),
    onTextSize: (callback) =>
      ipcRenderer.on("settings:appearance:textSizeChanged", callback),
  });
};
