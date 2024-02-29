import { app, shell } from "electron";
import { isDevelopment, isMac, isTest } from "./environment";
import { getTextSize, setTextSize } from "./settings/appearance";
import { connect, disconnect } from "./network";
import { openAbout, openNewEnquiry } from "./ipc/navigation";

export const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About UK Poisons Information Database",
              click: () => {
                openAbout();
              },
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "New Enquiry",
        accelerator: "CmdOrCtrl+N",
        click: () => {
          openNewEnquiry();
        },
      },
      { type: "separator" },
      isMac ? { role: "close" } : { role: "quit" },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      {
        label: "Default Text Size",
        accelerator: "CmdOrCtrl+0",
        click: () => {
          setTextSize(null, 1);
        },
      },
      {
        label: "Increase Text Size",
        accelerator: "CmdOrCtrl+Plus",
        click: () => {
          setTextSize(null, getTextSize() + 0.1);
        },
      },
      {
        label: "Decrease Text Size",
        accelerator: "CmdOrCtrl+-",
        click: () => {
          setTextSize(null, getTextSize() - 0.1);
        },
      },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  ...(isDevelopment || isTest
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            {
              label: "Open User Data Folder",
              accelerator: "CmdOrCtrl+Shift+I",
              click: () => {
                shell.openPath(app.getPath("userData"));
              },
            },
            { type: "separator" },
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
        },
      ]
    : []),
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];
