import UkpidStore from "../classes/UkpidStore";

const settingsStore = (uid) =>
  new UkpidStore(
    `User Settings/${uid}`,
    {
      additionalProperties: false,
      theme: {
        type: "string",
        default: "system",
      },
      textSize: {
        type: "number",
        maximum: 2,
        minimum: 1,
        default: 1,
      },
    },
    {
      encryptionKey: "settings", // not for security, just to stop someone fiddling with the json file
    },
  );

export default settingsStore;
