import UkpidStore from "../classes/UkpidStore";

const userStore = new UkpidStore("user", {
  id: { type: "integer" },
  name: { type: "string" },
  email: { type: "string", format: "email" },
  location: { type: "string" },
  role: {
    type: "array",
    items: {
      type: "string",
    },
  },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
});

export default userStore;
