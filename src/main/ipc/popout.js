import { ipcMain } from "electron";
import { changeId, getWindowDetails } from "../browser-windows/popout";

export const popoutIpcHandlers = () => {
  ipcMain.handle("popout:getDetails", getWindowDetails);
  ipcMain.on("popout:changeId", changeId);
};
