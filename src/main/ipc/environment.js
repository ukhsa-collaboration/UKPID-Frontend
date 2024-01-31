import { ipcMain } from "electron";
import { isDevelopment, isTest, isPrerelease, isRelease } from "../environment";

export const environmentIpcHandlers = () => {
  ipcMain.handle("environment:isDevelopment", () => isDevelopment);
  ipcMain.handle("environment:isTest", () => isTest);
  ipcMain.handle("environment:isRelease", () => isRelease);
  ipcMain.handle("environment:isPrerelease", () => isPrerelease);
};
