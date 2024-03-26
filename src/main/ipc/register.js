import { applicationIpcHandlers } from "./application";
import { environmentIpcHandlers } from "./environment";
import { authIpcHandlers } from "./auth";
import { userIpcHandlers } from "./user";
import { connectionIpcHandlers } from "./connection";
import { apiIpcHandlers } from "./api";
import { networkIpcHandlers } from "./network";
import { settingsIpcHandlers } from "./settings";
import { enquiriesIpcHandlers } from "./enquiries";
import { popoutIpcHandlers } from "./popout";
import { formDefinitionIpcHandlers } from "./formDefinition";
import { codesIpcHandlers } from "./codes";

export const registerIpcHandlers = () => {
  applicationIpcHandlers();
  networkIpcHandlers();
  environmentIpcHandlers();
  authIpcHandlers();
  userIpcHandlers();
  connectionIpcHandlers();
  apiIpcHandlers();
  settingsIpcHandlers();
  popoutIpcHandlers();
  enquiriesIpcHandlers();
  formDefinitionIpcHandlers();
  codesIpcHandlers();
};
