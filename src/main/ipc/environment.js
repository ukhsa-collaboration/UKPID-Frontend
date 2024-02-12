import { ipcMain } from "electron";
import {
  isDevelopment,
  isTest,
  isPrerelease,
  isRelease,
  isWindows,
  isMac,
  isLinux,
} from "../environment";

export const environmentIpcHandlers = () => {
  ipcMain.handle("environment:isDevelopment", () => isDevelopment);
  ipcMain.handle("environment:isTest", () => isTest);
  ipcMain.handle("environment:isRelease", () => isRelease);
  ipcMain.handle("environment:isPrerelease", () => isPrerelease);
  ipcMain.handle("environment:isWindows", () => isWindows);
  ipcMain.handle("environment:isMac", () => isMac);
  ipcMain.handle("environment:isLinux", () => isLinux);
};
