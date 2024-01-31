import { request } from "./base";

export const status = async (ipcEvent = null) =>
  request({
    endpoint: `/status`,
    options: { method: "GET" },
    useAuth: false,
    ipcEvent,
  });
