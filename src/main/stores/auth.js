import UkpidStore from "../classes/UkpidStore";

const authStore = new UkpidStore("auth", {
  additionalProperties: false,
  access_token: {
    type: "string",
  },
  refresh_token: {
    type: "string",
  },
  tokenExpiresAt: {
    type: "string",
  },
});

export default authStore;
