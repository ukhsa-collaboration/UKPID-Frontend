export class AuthWindowClosedError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthWindowClosedError";
  }
}
