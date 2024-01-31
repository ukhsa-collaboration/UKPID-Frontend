import { ipcMain } from "electron";
import { login, isLoginRequired } from "../auth";

export const authIpcHandlers = () => {
  ipcMain.on("auth:login", login);
  ipcMain.handle("auth:isLoginRequired", isLoginRequired);
};
