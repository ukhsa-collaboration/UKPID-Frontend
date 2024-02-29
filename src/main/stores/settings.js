import UkpidStore from "../classes/UkpidStore";

const settingsStore = (uid) =>
  new UkpidStore(
    `User Settings/${uid}`,
    {
      additionalProperties: false,
      "appearance:theme": {
        type: "string",
        default: "system",
      },
      "appearance:textSize": {
        type: "number",
        maximum: 2,
        minimum: 1,
        default: 1,
      },
      "audit:split": {
        type: "boolean",
        default: false,
      },
    },
    {
      encryptionKey: "settings", // not for security, just to stop someone fiddling with the json file
    },
  );

export default settingsStore;
