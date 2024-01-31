import { BrowserWindow } from "electron";
import { getWindowTheme } from "../window-theme";
import { buildingForTest } from "../util";
import { enableLoadingViewOnLoad } from "../browser-views/loading";
import path from "node:path";
import { sendToAll } from "../web-contents";

let window;
let userAborted = false;

/**
 * @returns {Electron.CrossProcessExports.BrowserWindow}
 */
export const createAuthWindow = (
  url,
  modal = false,
  parent = null,
  clearSession = false,
) => {
  window = new BrowserWindow({
    ...getWindowTheme(process.platform !== "darwin", 30), // macOS doesn't have a titlebar or close buttons on modals
    width: 380,
    height: 450,
    resizable: false,
    titleBarStyle: "hidden",
    minimizable: false,
    maximizable: false,
    fullScreenable: false,
    webPreferences: {
      sandbox: !buildingForTest,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    modal,
    parent,
  });

  if (clearSession) {
    window.webContents.session.clearStorageData();
  }

  window.webContents.on(
    "did-fail-load",
    (_event, _errorCode, errorDescription) => {
      closeProgrammatically();
      console.log("Auth: loadFail:", errorDescription);
      if (parent)
        parent.webContents.send("auth:failedToLoad", errorDescription);
    },
  );

  window.on("closed", () => {
    sendToAll("auth:windowClosed", userAborted);
  });

  userAborted = true;

  window.show();
  window.loadURL(url);

  enableLoadingViewOnLoad(window);

  return window;
};

export const closeProgrammatically = () => {
  userAborted = false;
  window.close();
};
