export class LoginRequestedError extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginRequestedError";
  }
}
