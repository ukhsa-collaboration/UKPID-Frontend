import "@/scss/base.scss";

import "@/modules/fluent";
import "@/modules/sentry";
import "@/modules/textSize";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import Popout from "./Popout.vue";
import routes from "./routes";
import { i18n } from "@/modules/i18n.mjs";
import { UidPlugin } from "@shimyshack/uid";

const pinia = createPinia();

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(Popout);

app.use(pinia).use(router).use(i18n).use(UidPlugin).mount("#app");
