import { appearanceSettingsIpcHandlers } from "./settings/appearance";
import { auditSettingsIpcHandlers } from "./settings/audit";

export const settingsIpcHandlers = () => {
  appearanceSettingsIpcHandlers();
  auditSettingsIpcHandlers();
};
