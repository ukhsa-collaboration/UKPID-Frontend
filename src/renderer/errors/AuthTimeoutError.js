export class AuthTimeoutError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "AuthTimeoutError";
  }
}
