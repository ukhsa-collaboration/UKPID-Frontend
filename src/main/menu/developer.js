import { app, Menu, MenuItem, shell } from "electron";
import { connect, disconnect } from "../network";
import { isDevelopment } from "../environment";

export const developerMenu = new MenuItem({
  label: "Developer",
  submenu: [
    {
      label: "Open User Data Folder",
      accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
      click: () => {
        shell.openPath(app.getPath("userData"));
      },
    },
    {
      label: "Disconnect Network",
      click: async () => {
        await disconnect();
      },
    },
    {
      label: "Connect Network",
      click: async () => {
        await connect();
      },
    },
  ],
});

export const addDeveloperMenu = () => {
  if (isDevelopment) {
    const menu = Menu.getApplicationMenu();
    menu.insert(menu.items.length - 1, developerMenu);
    Menu.setApplicationMenu(menu);
  }
};
