import { ipcMain } from "electron";
import userStore from "../stores/user";

export const userIpcHandlers = () => {
  ipcMain.handle("user:get", () => userStore.store);
};
