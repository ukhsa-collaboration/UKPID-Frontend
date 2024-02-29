import { AuthWindowClosedError } from "@/errors/AuthWindowClosedError";
import { AuthTimeoutError } from "@/errors/AuthTimeoutError";
import { ApiError } from "@/errors/ApiError";
import { LoginRequestedError } from "@/errors/LoginRequestedError";
import { UnauthenticatedError } from "@/errors/UnauthenticatedError";

export const apiRequest = async (
  { key, method, waitForLogin = true },
  ...args
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await window[key][method](...args);

      if (Object.hasOwn(res, "electronError")) {
        // If the user needs to log in
        if (res.electronError.name === "LoginRequested") {
          if (!waitForLogin) {
            return reject(new LoginRequestedError());
          }

          // When authenticated, retry the api request
          window.auth.onAuthenticated(() => {
            resolve(apiRequest({ key, method, waitForLogin: false, args }));
          });

          // When auth window closed, reject if user aborted the login, else reject if not resolved after 30 seconds
          window.auth.onAuthWindowClosed((_ev, userAborted) => {
            if (userAborted) {
              return reject(new AuthWindowClosedError());
            } else {
              setTimeout(
                () =>
                  reject(
                    new AuthTimeoutError(
                      "Auth window closed, but no authenticated event received.",
                      { cause: "NO_AUTH_EVENT" },
                    ),
                  ),
                1000 * 30,
              );
            }
          });

          // Reject if not resolved after 5 mins
          setTimeout(
            () =>
              reject(
                new AuthTimeoutError(
                  "Auth window closed or Authenticated event not received.",
                  { cause: "NO_AUTH_WINDOW_CLOSED_OR_AUTHENTICATED_EVENT" },
                ),
              ),
            1000 * 60 * 5,
          );
        } else {
          let cause = undefined;

          try {
            cause = JSON.parse(res.electronError.cause);
          } catch (e) {}

          let err;

          if (cause?.status === 403) {
            err = new UnauthenticatedError();
          } else {
            err = new ApiError(res.electronError.message, {
              cause,
            });
          }

          return reject(err);
        }
      } else {
        return resolve(res);
      }
    } catch (e) {
      return reject(e);
    }
  });
};
