import { request } from "./base";

export const index = async (ipcEvent = null) =>
  request({
    endpoint: `/form-definition`,
    options: { method: "GET" },
    ipcEvent,
  });
