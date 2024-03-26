import { ipcMain } from "electron";
import * as UserClient from "../../ukpid-api/user";

export const userApiIpcHandlers = () => {
  ipcMain.handle("api:user:user", UserClient.show);
  ipcMain.handle("api:user:me", UserClient.me);
  ipcMain.handle("api:user:audits", UserClient.audits);
  ipcMain.handle("api:user:audit", UserClient.audit);
};
