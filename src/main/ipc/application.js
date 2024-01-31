import { ipcMain } from "electron";
import { logout, prelaunchComplete } from "../application";

export const applicationIpcHandlers = () => {
  ipcMain.on("application:launch", prelaunchComplete);
  ipcMain.on("application:logout", logout);
};
