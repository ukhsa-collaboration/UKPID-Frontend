import { getWindowTheme, setTheme } from "./main/window-theme";
import "./main/menu";
import { buildingForTest } from "./main/util";
import { environmentIpcHandlers } from "./main/ipc/environment";
import { showDevTools } from "./main/dev-tools";
import { handleDeepLink } from "./main/deep-links";

if (buildingForTest) {
  import("wdio-electron-service/main");
}

const { app, BrowserWindow, nativeTheme } = require("electron");
const path = require("node:path");

let mainWindow;
const windows = [];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("ukpid", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("ukpid");
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    ...getWindowTheme(),
    width: 1280,
    height: 720,
    minHeight: 500,
    minWidth: 550,
    titleBarStyle: "hidden",
    webPreferences: {
      sandbox: !buildingForTest,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  windows.push(mainWindow);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    showDevTools(mainWindow);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

const updateWindowTheme = () => {
  windows.forEach((window) => setTheme(window));
};

// Ensure only one instance of the application can be opened
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // Quit if this is a second instance
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Focus the main window if a second instance is opened
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }

    // Handle deep linking on Win/Linux.
    // The commandLine is array of strings in which last element is deep link url
    const maybeDeepLink = commandLine.pop();
    if (maybeDeepLink.startsWith("ukpid://")) {
      handleDeepLink(maybeDeepLink);
    }
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow();
    nativeTheme.addListener("updated", updateWindowTheme);
    environmentIpcHandlers();
  });
}

// Handle the deep link protocol - macOS
app.on("open-url", (event, url) => {
  handleDeepLink(url);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
