import { request } from "./base";

export const user = async (ipcEvent = null, id) =>
  request({
    endpoint: `/user/${id}`,
    options: { method: "GET" },
    ipcEvent,
  });

export const me = async (ipcEvent = null) =>
  request({
    endpoint: `/user/me`,
    options: { method: "GET" },
    ipcEvent,
  });

export const audits = async (ipcEvent = null, queryParams) =>
  request({
    endpoint: `/user/audits`,
    options: { method: "GET" },
    queryParams,
    ipcEvent,
  });

export const audit = async (ipcEvent = null, user, queryParams) =>
  request({
    endpoint: `/user/${user}/audit`,
    options: { method: "GET" },
    queryParams,
    ipcEvent,
  });
