import { contextBridge, ipcRenderer } from "electron";

export const exposeUserApi = () => {
  contextBridge.exposeInMainWorld("userApi", {
    user: (user) => ipcRenderer.invoke("api:user:user", user),
    me: () => ipcRenderer.invoke("api:user:me"),
    audits: (params) => ipcRenderer.invoke("api:user:audits", params),
    audit: (user, params) => ipcRenderer.invoke("api:user:audit", user, params),
  });
};
