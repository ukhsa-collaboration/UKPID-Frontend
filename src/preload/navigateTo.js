import { contextBridge, ipcRenderer } from "electron";

export const exposeNavigateTo = () => {
  contextBridge.exposeInMainWorld("navigateTo", {
    // Enquires
    onOpenNewEnquiry: (callback) =>
      ipcRenderer.on("navigateTo:newEnquiry", callback),

    // Settings
    onOpenAbout: (callback) => ipcRenderer.on("navigateTo:about", callback),
  });
};
