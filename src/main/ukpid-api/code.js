import { request } from "./base";

export const index = async (ipcEvent = null) =>
  request({
    endpoint: `/code`,
    options: { method: "GET" },
    ipcEvent,
  });

export const show = async (ipcEvent = null, id) =>
  request({
    endpoint: `/code/${id}`,
    options: { method: "GET" },
    ipcEvent,
  });

// export const store = async (ipcEvent = null) =>
//   request({
//     endpoint: `/code`,
//     options: { method: "POST" },
//     ipcEvent,
//   });
//
// export const update = async (ipcEvent = null, id) =>
//   request({
//     endpoint: `/code`,
//     options: { method: "PUT" },
//     ipcEvent,
//   });
