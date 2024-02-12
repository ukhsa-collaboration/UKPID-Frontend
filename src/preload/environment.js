import { contextBridge, ipcRenderer } from "electron";

export const exposeEnvironment = () => {
  contextBridge.exposeInMainWorld("environment", {
    isDevelopment: ipcRenderer.invoke("environment:isDevelopment"),
    isTest: ipcRenderer.invoke("environment:isTest"),
    isPrerelease: ipcRenderer.invoke("environment:isPrerelease"),
    isRelease: ipcRenderer.invoke("environment:isRelease"),
    isWindows: ipcRenderer.invoke("environment:isWindows"),
    isMac: ipcRenderer.invoke("environment:isMac"),
    isLinux: ipcRenderer.invoke("environment:isLinux"),
  });
};
