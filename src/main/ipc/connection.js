import { ipcMain } from "electron";
import { getStatus } from "../connection-status";

export const connectionIpcHandlers = () => {
  ipcMain.handle("connection:getStatus", getStatus);
};
