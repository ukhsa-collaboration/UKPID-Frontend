import { request } from "./base";

export const me = async (ipcEvent = null) =>
  request({
    endpoint: `/user/me`,
    options: { method: "GET" },
    ipcEvent,
  });
