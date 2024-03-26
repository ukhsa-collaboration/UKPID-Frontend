import { app, session } from "electron";
import { checkConnection } from "./connectionStatus";

/**
 * This module is used for testing offline mode
 * When networkDisconnected is true, electron webRequests and ukpid-api requests will not succeed.
 */

global.networkDisconnected = false;

app.on("ready", () => {
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (!global.networkDisconnected) {
      callback({});
      return;
    }

    if (
      details.url.startsWith(
        import.meta.env.UKPID_OAUTH_AUTHORIZATION_ENDPOINT,
      ) ||
      details.url.startsWith(import.meta.env.UKPID_OAUTH_TOKEN_ENDPOINT) ||
      details.url.startsWith(import.meta.env.UKPID_API_BASE_URL)
    ) {
      callback({ cancel: true });
    } else {
      callback({});
    }
  });
});

export const connect = async () => {
  global.networkDisconnected = false;
  await checkConnection();
};
export const disconnect = async () => {
  global.networkDisconnected = true;
  await checkConnection();
};
