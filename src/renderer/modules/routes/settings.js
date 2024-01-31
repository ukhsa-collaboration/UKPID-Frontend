import Settings from "@/pages/Settings.vue";
import General from "@/pages/Settings/General.vue";
import Account from "@/pages/Settings/Account.vue";
import Notifications from "@/pages/Settings/Notifications.vue";
import Appearance from "@/pages/Settings/Appearance.vue";
import About from "@/pages/Settings/About.vue";

const namespace = "settings";
export default {
  path: "/settings",
  component: Settings,
  children: [
    {
      path: "",
      name: namespace,
      component: General,
    },
    {
      path: "account",
      name: `${namespace}.account`,
      component: Account,
    },
    {
      path: "notifications",
      name: `${namespace}.notifications`,
      component: Notifications,
    },
    {
      path: "appearance",
      name: `${namespace}.appearance`,
      component: Appearance,
    },
    {
      path: "about",
      name: `${namespace}.about`,
      component: About,
    },
  ],
};
