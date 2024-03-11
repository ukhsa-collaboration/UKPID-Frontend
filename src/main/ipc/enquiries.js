import { ipcMain } from "electron";
import { openEnquiryPopout } from "../browser-windows/popout";

export const enquiriesIpcHandlers = () => {
  ipcMain.on("enquiries:openPopout", openEnquiryPopout);
};
