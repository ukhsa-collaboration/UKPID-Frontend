import { ipcMain } from "electron";
import {
  getTextSize,
  getTheme,
  setTextSize,
  setTheme,
} from "../../settings/appearance";

export const appearanceSettingsIpcHandlers = () => {
  ipcMain.on("settings:appearance:setTheme", setTheme);
  ipcMain.handle("settings:appearance:getTheme", getTheme);
  ipcMain.on("settings:appearance:setTextSize", setTextSize);
  ipcMain.handle("settings:appearance:getTextSize", getTextSize);
};
