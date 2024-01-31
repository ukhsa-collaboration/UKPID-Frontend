import "@/scss/base.scss";

import "@/modules/sentry";
import { createApp } from "vue";
import "@/modules/fluent";
import { i18n } from "@/modules/i18n.mjs";
import Loading from "./Loading.vue";

const app = createApp(Loading);

app.use(i18n);

app.mount("#app");
