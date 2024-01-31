export class AuthTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthTimeoutError";
  }
}
