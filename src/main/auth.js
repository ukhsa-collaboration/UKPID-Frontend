import { generators, Issuer } from "openid-client";
import authStore from "./stores/auth";
import {
  closeProgrammatically as closeAuthWindowProgrammatically,
  createAuthWindow,
} from "./browser-windows/auth";
import { BrowserWindow } from "electron";
import { sendToAll } from "./web-contents";
import { LoginRequested } from "./errors/LoginRequested";

const ukpidPassport = new Issuer({
  authorization_endpoint: import.meta.env.UKPID_OAUTH_AUTHORIZATION_ENDPOINT,
  token_endpoint: import.meta.env.UKPID_OAUTH_TOKEN_ENDPOINT,
});

const callbackUrl = "ukpid://oauth/callback";

const client = new ukpidPassport.Client({
  client_id: import.meta.env.UKPID_OAUTH_CLIENT_ID,
  client_secret: "",
  redirect_uris: [callbackUrl],
  response_types: ["code"],
});

const code_verifier = generators.codeVerifier();

let authWindow;

/**
 * Show the login screen
 *
 * @returns {Promise<boolean>}
 */
export const login = async (event = null) => {
  const code_challenge = generators.codeChallenge(code_verifier);

  const authorizationUrl = client.authorizationUrl({
    scope: "*",
    code_challenge,
    code_challenge_method: "S256",
  });

  let parentWindow = false;

  if (event) {
    parentWindow = BrowserWindow.fromWebContents(event.sender);
  }

  authWindow = createAuthWindow(
    authorizationUrl,
    !!parentWindow,
    parentWindow,
    true,
  );

  return true;
};

/**
 * Store the access and refresh token after retrieval
 *
 * @param token
 * @param {boolean} silent store token without sending an auth:authenticated event
 */
const storeToken = (token, silent = false) => {
  authStore.setEncrypted("user.accessToken", token.access_token);
  authStore.setEncrypted("user.refreshToken", token.refresh_token);
  authStore.set("user.tokenExpiresAt", token.expires_at);

  if (!silent) sendToAll("auth:authenticated", true);
};

/**
 * Handle OAuth callback
 *
 * @param url
 * @returns {Promise<void>}
 */
export const callback = async (url) => {
  if (authWindow && !authWindow?.isDestroyed())
    closeAuthWindowProgrammatically();

  const params = client.callbackParams(url);
  const token = await client.oauthCallback(callbackUrl, params, {
    code_verifier,
  });

  storeToken(token);
};

let refreshPromise = null;

/**
 * Refresh the access token using the stored refresh token
 *
 * @param {boolean} silent store token without sending an auth:authenticated event
 * @returns {Promise<boolean>}
 */
const refreshAccessToken = (silent = false) => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = new Promise(async (resolve) => {
    const refreshToken = authStore.getEncrypted("user.refreshToken");

    if (!refreshToken) return false;

    try {
      const token = await client.refresh(refreshToken);
      storeToken(token, silent);
      resolve(true);
    } catch (e) {
      resolve(false);
    }

    refreshPromise = null;
  });

  return refreshPromise;
};

/**
 * Checks if a valid access token is available or can be refreshed
 *
 * @returns {boolean} True if a new login is required, false if the stored access token has not expired or has been refreshed
 */
export const isLoginRequired = async () => {
  // First check if the access token is set
  const accessToken = authStore.getEncrypted("user.accessToken");

  if (!accessToken) return true;

  // Next check if the access token needs to be refreshed
  let expiresAt = authStore.get("user.tokenExpiresAt");
  const dateNow = Date.now() / 1000;

  if (dateNow > expiresAt) {
    return !(await refreshAccessToken(true));
  }

  return false;
};

export const logout = () => {
  authStore.delete("user");
};

export const getAccessToken = async (event = null) => {
  let expiresAt = authStore.get("user.tokenExpiresAt");
  const expiryBuffer = 5; // We'll count a token as expired if we're within this many seconds of the expiry time to avoid a scenario when the token expires a moment before the server processes the request.
  const dateNow = Date.now() / 1000;

  if (dateNow > expiresAt - expiryBuffer) {
    await forceRefresh(event);
  }

  return authStore.getEncrypted("user.accessToken");
};

export const forceRefresh = async (event = null) => {
  if (!(await refreshAccessToken())) {
    await login(event);
    throw new LoginRequested();
  } else {
    return true;
  }
};
