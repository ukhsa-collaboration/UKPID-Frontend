import { forceRefresh, getAccessToken } from "../auth";

export const request = async ({
  endpoint,
  options = {},
  queryParams = null,
  useAuth = true,
  ipcEvent = null,
  retry = null,
}) => {
  try {
    if (global.networkDisconnected) {
      throw new TypeError("fetch failed");
    }

    let accessToken = useAuth ? await getAccessToken(ipcEvent) : null;

    const baseURL = import.meta.env.UKPID_API_BASE_URL;

    const url = new URL(
      `${baseURL.replace(/\/?$/, "/")}${
        endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
      }`,
    );

    if (queryParams) url.search = new URLSearchParams(queryParams).toString();

    const headersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (accessToken) {
      headersInit.Authorization = `Bearer ${accessToken}`;
    }

    const headers = new Headers(headersInit);

    console.log(url.toString());

    const response = await fetch(url.toString(), { headers, ...options });

    if (!response.ok) {
      if (response?.status === 401) {
        console.log("401", await response.text());

        // Ensure that we're only retrying once so that we're not stuck in a loop
        if (!retry) {
          const refreshed = await forceRefresh(ipcEvent);

          if (refreshed) {
            return await request({
              endpoint,
              options,
              queryParams,
              useAuth,
              ipcEvent,
              retry: 1,
            });
          }
        }
      }

      throw new Error(`HTTP error! status: ${response.status}`, {
        cause: JSON.stringify({
          status: response?.status,
          body: response?.text(),
        }),
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
