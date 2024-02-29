export class LoginRequestedError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "LoginRequestedError";
  }
}
