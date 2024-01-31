import * as StatusClient from "./ukpid-api/status";
import { sendToAll } from "./web-contents";

let checkTimeout;
let status = "disconnected";

export const isConnected = async () => {
  try {
    await StatusClient.status();

    return true;
  } catch (e) {
    return false;
  }
};

export const checkConnection = async (periodic = false) => {
  let connectingTimeout;

  if (periodic) {
    clearInterval(checkTimeout);
    checkTimeout = null;
  }

  if (status !== "connected") {
    status = "connecting";

    // Add a timeout of a second before showing the connecting status, so that we aren't showing a flash of the message
    // when the connection is super quick, i.e. if it takes more than a second to connect, show the status
    connectingTimeout = setTimeout(
      () => sendToAll("connection:status", status),
      1000,
    );
  }

  status = (await isConnected()) ? "connected" : "disconnected";

  clearTimeout(connectingTimeout);
  sendToAll("connection:status", status);

  if (periodic) checkTimeout = setTimeout(() => checkConnection(true), 10000);
};

export const startConnectionCheck = () => {
  checkConnection(true);
};

export const stopConnectionCheck = () => {
  clearInterval(checkTimeout);
  checkTimeout = null;
};

export const getStatus = () => status;
