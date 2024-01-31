import { createMainWindow } from "./browser-windows/main";
import { createSplashWindow } from "./browser-windows/splash";
import { app, BrowserWindow, nativeTheme } from "electron";
import { handleDeepLink } from "./deep-links";
import { registerIpcHandlers } from "./ipc/register";
import { setTheme } from "./window-theme";
import { logout as authLogout } from "./auth";
import userStore from "./stores/user";

let ready = false;
/** @var {?Electron.BrowserWindow} splashWindow **/
let splashWindow = null;
/** @var {?Electron.BrowserWindow} mainWindow **/
export let mainWindow = null;

/**
 * Start the application
 *
 * Grabs the single instance lock, registers IPC handlers and launches the main application window
 */
export const startApplication = () => {
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
      const maybeDeepLink = commandLine.pop();
      if (maybeDeepLink.startsWith("ukpid://")) {
        handleDeepLink(maybeDeepLink);
      }
    });

    // Create mainWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
      registerIpcHandlers();
      launchMainApplicationWindow();

      nativeTheme.addListener("updated", () => {
        BrowserWindow.getAllWindows().forEach((window) => setTheme(window));
      });
    });
  }
};

/**
 * Launch the main application window if ready, otherwise show the splash screen
 */
export const launchMainApplicationWindow = () => {
  if (!ready) {
    splashWindow = createSplashWindow();
    return;
  }

  mainWindow = createMainWindow();

  mainWindow.once("ready-to-show", () => {
    if (!splashWindow?.isDestroyed()) splashWindow.close();
    mainWindow.show();
  });
};

/**
 * When prelaunch complete, launch the main window.
 *
 * Store the user for offline access and faster window initialisation
 */
export const prelaunchComplete = (_ev, user) => {
  ready = true;

  if (!user) {
    throw new Error("User not provided.");
  }

  userStore.clear();
  userStore.set(user);

  launchMainApplicationWindow();
};

export const logout = () => {
  ready = false;
  authLogout();

  BrowserWindow.getAllWindows().forEach((win) => {
    if (!win.isDestroyed()) win.close();
  });

  launchMainApplicationWindow();
};
