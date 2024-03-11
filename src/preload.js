// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { buildingForTest } from "./main/util";
import { exposeVersions } from "./preload/versions";
import { exposeEnvironment } from "./preload/environment";
import { exposeApplication } from "./preload/application";
import { exposeConnection } from "./preload/connection";
import { exposeAuth } from "./preload/auth";
import { exposeUser } from "./preload/user";
import { exposeApi } from "./preload/api";
import { exposeNetwork } from "./preload/network";
import { exposeSettings } from "./preload/settings";
import { exposeNavigateTo } from "./preload/navigateTo";
import { exposeEnquiries } from "./preload/enquiries";
import { exposePopout } from "./preload/popout";

if (buildingForTest) {
  import("wdio-electron-service/preload");
}

exposeVersions();
exposeEnvironment();
exposeApplication();
exposeNetwork();
exposeConnection();
exposeAuth();
exposeUser();
exposeApi();
exposeSettings();
exposeNavigateTo();
exposePopout();
exposeEnquiries();
