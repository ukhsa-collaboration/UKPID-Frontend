import { app } from "electron";
import path from "node:path";
import fs from "node:fs";

let metadata = null;

const getMetadata = () => {
  if (metadata) return metadata;

  try {
    // Load the metadata file - this is created in the packageAfterCopy hook of an Electron Forge build
    const file = fs.readFileSync(path.join(app.getAppPath(), "ukpid.json"), {
      encoding: "utf8",
      flag: "r",
    });

    metadata = JSON.parse(file);

    return metadata;
  } catch (e) {
    if (app.isPackaged) throw new Error(e);
  }
};

export const buildIdentifier = (() => {
  const metadata = getMetadata();

  return metadata?.buildIdentifier ?? "development";
})();
