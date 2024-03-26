import "./main/path";
import "./main/network";
import { app, BrowserWindow, Menu } from "electron";
import { buildingForTest } from "./main/util";
import { registerDeepLinkHandler } from "./main/deepLinks";
import {
  launchMainApplicationWindow,
  startApplication,
} from "./main/application";
import * as Sentry from "@sentry/electron";
import { startConnectionCheck } from "./main/connectionStatus";
import "./main/settings/userSettingsStore"; // Init the settings store
import { applyAppearance } from "./main/appearance";
import { menuTemplate } from "./main/menu";
import { startNewFormDefinitionCheck } from "./main/formDefinition";
import { startNewCodesCheck } from "./main/codes";

Sentry.init({
  dsn: "https://abcdb62a6145f7c68d987675268283a5@o4506234853457920.ingest.us.sentry.io/4506274745679872",
});

if (buildingForTest) {
  import("wdio-electron-service/main");
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Set up deep links
registerDeepLinkHandler();

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Start the application
startApplication();
startConnectionCheck();
startNewFormDefinitionCheck();
startNewCodesCheck();
applyAppearance();

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    launchMainApplicationWindow();
  }
});
