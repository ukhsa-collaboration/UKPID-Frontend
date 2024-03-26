import { ipcMain } from "electron";
import { getCodes } from "../codes";

export const codesIpcHandlers = () => {
  ipcMain.handle("codes:getCodes", getCodes);
};
