import "@/scss/base.scss";

import "@/fluent";
import "@/font-awesome";

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createI18n } from "vue-i18n";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "@/App.vue";
import { routes } from "@/routes";
import { i18nStrings } from "@/i18n";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const i18n = createI18n({
  locale: "en_GB",
  fallbackLocale: "en_GB",
  messages: i18nStrings,
});

const app = createApp(App);

app.use(router).use(i18n);

// app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
