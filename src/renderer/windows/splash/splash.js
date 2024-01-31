import "@/scss/base.scss";

import "@/modules/sentry";
import "@/modules/fluent";
import { createApp } from "vue";
import { i18n } from "@/modules/i18n.mjs";
import Splash from "./Splash.vue";

const app = createApp(Splash);

app.use(i18n);

app.mount("#app");
