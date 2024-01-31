import { BrowserWindow } from "electron";

export const sendToAll = (...args) => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send(...args);
  });
};
