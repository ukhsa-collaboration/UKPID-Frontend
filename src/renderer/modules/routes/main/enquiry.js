import Enquiries from "@/pages/Enquiries.vue";
import Landing from "@/pages/Enquiries/Landing.vue";
import Enquiry from "@/pages/Enquiries/Enquiry.vue";

const namespace = "enquiry";

export default {
  path: "/enquiry",
  component: Enquiries,
  children: [
    {
      path: "",
      name: `${namespace}`,
      component: Landing,
    },
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
