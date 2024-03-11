import Enquiry from "@/pages/Enquiries/Enquiry.vue";
import PopoutNavigationView from "@/components/NavigationView/PopoutNavigationView.vue";

const namespace = "enquiry";

export default {
  path: "/enquiry",
  component: PopoutNavigationView,
  children: [
    {
      path: "create",
      name: `${namespace}.create`,
      component: Enquiry,
    },
    {
      path: ":id",
      name: `${namespace}.edit`,
      component: Enquiry,
    },
  ],
};
