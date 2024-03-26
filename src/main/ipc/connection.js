import { ipcMain } from "electron";
import { getStatus } from "../connectionStatus";

export const connectionIpcHandlers = () => {
  ipcMain.handle("connection:getStatus", getStatus);
};
