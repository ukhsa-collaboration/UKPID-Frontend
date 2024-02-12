import { ipcMain } from "electron";
import { getTextSize, getTheme, setTextSize, setTheme } from "../settings";

export const settingsIpcHandlers = () => {
  ipcMain.on("settings:setTheme", setTheme);
  ipcMain.handle("settings:getTheme", getTheme);
  ipcMain.on("settings:setTextSize", setTextSize);
  ipcMain.handle("settings:getTextSize", getTextSize);
};
