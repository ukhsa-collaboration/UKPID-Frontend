import { exposeUserApi } from "./api/user";
import { exposeStatusApi } from "./api/status";

export const exposeApi = () => {
  exposeUserApi();
  exposeStatusApi();
};
