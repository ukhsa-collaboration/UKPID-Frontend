export class UnauthenticatedError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "UnauthenticatedError";
  }
}
