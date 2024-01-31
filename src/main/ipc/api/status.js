import { ipcMain } from "electron";
import * as Status from "../../ukpid-api/status";

export const statusApiIpcHandlers = () => {
  ipcMain.handle("api:status:status", Status.status);
};
