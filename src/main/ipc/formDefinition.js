import { ipcMain } from "electron";
import { getFormDefinition } from "../formDefinition";

export const formDefinitionIpcHandlers = () => {
  ipcMain.handle("formDefinition:get", getFormDefinition);
};
