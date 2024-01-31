export class LoginRequested extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginRequested";
  }
}
