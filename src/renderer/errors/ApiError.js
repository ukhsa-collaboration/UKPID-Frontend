export class ApiError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "ApiError";
  }
}
