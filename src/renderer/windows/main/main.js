import "@/scss/base.scss";

import "@/modules/fluent";
import "@/modules/sentry";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./Main.vue";
import { routes } from "@/modules/routes";
import { i18n } from "@/modules/i18n.mjs";

const pinia = createPinia();

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(Main);

app.use(pinia).use(router).use(i18n).mount("#app");
