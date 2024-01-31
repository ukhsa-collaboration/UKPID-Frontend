import { ipcMain } from "electron";
import { connect, disconnect } from "../network";

export const networkIpcHandlers = () => {
  ipcMain.on("network:connect", connect);
  ipcMain.on("network:disconnect", disconnect);
};
