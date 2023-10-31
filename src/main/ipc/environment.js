import { isDevelopment, isTest, isPrerelease, isRelease } from "../environment";

const { ipcMain } = require("electron");

export const environmentIpcHandlers = () => {
  ipcMain.handle("isDevelopment", () => isDevelopment);
  ipcMain.handle("isTest", () => isTest);
  ipcMain.handle("isRelease", () => isRelease);
  ipcMain.handle("isPrerelease", () => isPrerelease);
};
