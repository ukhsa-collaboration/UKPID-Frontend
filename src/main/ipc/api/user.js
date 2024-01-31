import { ipcMain } from "electron";
import * as UserClient from "../../ukpid-api/user";

export const userApiIpcHandlers = () => {
  ipcMain.handle("api:user:me", UserClient.me);
};
