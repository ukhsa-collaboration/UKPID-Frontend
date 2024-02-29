import { ipcMain } from "electron";
import { getSplit, setSplit } from "../../settings/audit";

export const auditSettingsIpcHandlers = () => {
  ipcMain.on("settings:audit:setSplit", setSplit);
  ipcMain.handle("settings:audit:getSplit", getSplit);
};
