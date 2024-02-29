import Audit from "@/pages/Audit.vue";
import Enquiries from "@/pages/Audit/Enquiries.vue";
import Users from "@/pages/Audit/Users.vue";

const namespace = "audit";
export default {
  path: "/audit",
  component: Audit,
  children: [
    {
      path: "",
      name: `${namespace}`,
      component: Enquiries,
    },
    {
      path: "users",
      name: `${namespace}.users`,
      component: Users,
    },
  ],
};
