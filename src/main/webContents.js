import { BrowserWindow } from "electron";
import { mainWindowUrl } from "./browser-windows/main";
import { launchMainApplicationWindow } from "./application";

/**
 * Send message to the webContents of all BrowserWindows.
 * @param args
 */
export const sendToAll = (...args) => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send(...args);
  });
};

const isMainWindow = (window) => {
  console.log(window);
  if (!window || window.isDestroyed()) return false;

  const url = window.webContents.getURL();

  return url.startsWith(mainWindowUrl);
};

/**
 * Send message to webContents of the main BrowserWindow.
 * Attempts to send to the focused main window, otherwise the first main window opened.
 * If no main window is opened, a new one will open and the message is sent to it.
 *
 * @param args
 */
export const sendToMain = (...args) => {
  try {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    if (isMainWindow(focusedWindow)) {
      focusedWindow.webContents.send(...args);
      return;
    }

    const allWindows = BrowserWindow.getAllWindows();
    for (let i in allWindows) {
      const window = allWindows[i];

      if (isMainWindow(window)) {
        window.webContents.send(...args);
        window.focus();
        return;
      }
    }

    // Open new window
    const mainWindow = launchMainApplicationWindow();
    mainWindow.once("show", () => {
      mainWindow.webContents.send(...args);
    });
  } catch (e) {
    console.error(e);
  }
};
