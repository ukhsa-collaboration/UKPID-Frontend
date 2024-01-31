import { app } from "electron";
import path from "node:path";
import { buildIdentifier } from "./app-metadata";

const userDataPath = path.join(
  app.getPath("appData"),
  app.getName(),
  buildIdentifier,
);

app.setPath("userData", userDataPath);
