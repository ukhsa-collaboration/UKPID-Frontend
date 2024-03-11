import { contextBridge, ipcRenderer } from "electron";

export const exposeEnquiries = () => {
  contextBridge.exposeInMainWorld("enquiries", {
    openPopout: (id) => ipcRenderer.send("enquiries:openPopout", id),
  });
};
