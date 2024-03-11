import { contextBridge, ipcRenderer } from "electron";

export const exposePopout = () => {
  contextBridge.exposeInMainWorld("popout", {
    getDetails: () => ipcRenderer.invoke("popout:getDetails"),
    changeId: () => ipcRenderer.send("popout:changeId"),
  });
};
