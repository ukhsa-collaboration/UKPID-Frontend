import { getAccessToken } from "../auth";

export const request = async ({
  endpoint,
  options = {},
  useAuth = true,
  ipcEvent = null,
}) => {
  try {
    if (global.networkDisconnected) {
      throw new TypeError("fetch failed");
    }

    let accessToken = useAuth ? await getAccessToken(ipcEvent) : null;

    const baseURL = import.meta.env.UKPID_API_BASE_URL;

    const url = `${baseURL.replace(/\/?$/, "/")}${
      endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
    }`;

    const headersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (accessToken) {
      headersInit.Authorization = `Bearer ${accessToken}`;
    }

    const headers = new Headers(headersInit);

    const response = await fetch(url, { headers, ...options });

    if (!response.ok) {
      if (response?.status === 401) {
        // TODO Unauthed - return to this when auth gates are implemented server side
        // Check if response mentions the user not being logged in, or the user not having permission
        // If the latter, return a permission error?
        // Else, refresh token and try request again
        // If that fails, return auth error??
        console.log("401", response.text());
      }

      throw new Error(`HTTP error! status: ${response.status}`, {
        cause: response,
      });
    }

    return response.headers.get("Content-Type") === "application/json"
      ? response.json()
      : response.text();
  } catch (e) {
    if (!ipcEvent) throw e;

    return {
      electronError: { name: e.name, message: e.message, cause: e.cause },
    };
  }
};
