export class AuthWindowClosedError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "AuthWindowClosedError";
  }
}
