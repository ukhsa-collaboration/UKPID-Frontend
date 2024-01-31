import { app } from "electron";
import { buildIdentifier } from "./app-metadata";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isTest = app.isPackaged && buildIdentifier === "test";
export const isPrerelease = app.isPackaged && buildIdentifier === "prerelease";
export const isRelease = app.isPackaged && buildIdentifier === "release";
