import { userApiIpcHandlers } from "./api/user";
import { statusApiIpcHandlers } from "./api/status";

export const apiIpcHandlers = () => {
  userApiIpcHandlers();
  statusApiIpcHandlers();
};
