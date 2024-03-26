import { BrowserWindow, ipcMain } from "electron";
import { getWindowTheme } from "../windowTheme";
import { buildingForTest } from "../util";
import path from "node:path";
import { showDevTools } from "../devTools";
import * as Sentry from "@sentry/electron";

export const popoutWindowUrl =
  POPOUT_WINDOW_VITE_DEV_SERVER_URL ??
  path.join(__dirname, `../renderer/${POPOUT_WINDOW_VITE_NAME}/index.html`);

/**
 * @returns {Electron.CrossProcessExports.BrowserWindow}
 */
const createPopoutWindow = (route, options = {}) => {
  // Create the browser window.
  const window = new BrowserWindow({
    ...getWindowTheme(),
    width: 500,
    height: 500,
    minHeight: 500,
    minWidth: 500,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      sandbox: !buildingForTest,
      preload: path.join(__dirname, "preload.js"),
    },
    ...options,
  });

  // and load the index.html of the app.
  if (POPOUT_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(`${popoutWindowUrl}/#/${route}`);
    showDevTools(window);
  } else {
    window.loadFile(`${popoutWindowUrl}/#/${route}`);
  }

  return window;
};

const windows = {};

export const getWindowDetails = (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);
  return windows[browserWindow.id];
};

export const changeId = (event, id) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);
  windows[browserWindow.id].id = id;
};

export const openEnquiryPopout = (_event, id) => {
  // Check if existing window is open, if so focus it
  const existingWindowId = Object.keys(windows).find(
    (key) => windows[key]?.type === "enquiry" && windows[key]?.id === id,
  );

  if (existingWindowId) {
    let existingWindow;

    try {
      existingWindow = BrowserWindow.fromId(parseInt(existingWindowId, 10));
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }

    if (existingWindow && !existingWindow.isDestroyed()) {
      existingWindow.focus();
      return;
    }
  }

  // Else, open a new window
  const window = createPopoutWindow(`enquiry/${id}`, {
    width: 640,
    height: 500,
    minHeight: 500,
    minWidth: 640,
  });

  windows[window.id] = {
    type: "enquiry",
    id,
  };

  window.once("ready-to-show", () => {
    window.show();
  });

  // on window close, remove fom array
  window.on("closed", () => {
    delete windows[window.id];
  });
};
