import { contextBridge } from "electron";

export const exposeVersions = () => {
  contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  });
};
