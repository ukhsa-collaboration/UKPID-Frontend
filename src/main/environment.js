import { app } from "electron";
import { buildIdentifier } from "./appMetadata";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isTest = app.isPackaged && buildIdentifier === "test";
export const isPrerelease = app.isPackaged && buildIdentifier === "prerelease";
export const isRelease = app.isPackaged && buildIdentifier === "release";

export const isWindows = process.platform === "win32";
export const isMac = process.platform === "darwin";
export const isLinux = process.platform === "linux";
