import UkpidStore from "../classes/UkpidStore";

const formDefinitionStore = new UkpidStore("form-definition", {
  additionalProperties: false,
  version: {
    type: "integer",
  },
  requiredDesktopVersion: {
    type: "string",
  },
  definition: {
    type: "object",
  },
});

export default formDefinitionStore;
