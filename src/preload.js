// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { buildingForTest } from "./main/util";

const { contextBridge, ipcRenderer } = require("electron");

if (buildingForTest) {
  import("wdio-electron-service/preload");
}

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("ukpid", {
  isDevelopment: ipcRenderer.invoke("isDevelopment"),
  isTest: ipcRenderer.invoke("isTest"),
  isPrerelease: ipcRenderer.invoke("isPrerelease"),
  isRelease: ipcRenderer.invoke("isRelease"),
});
