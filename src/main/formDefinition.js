import formDefinitionStore from "./stores/formDefinition";
import * as formDefinitionClient from "./ukpid-api";

let checkTimeout;

export const getFormDefinition = async () => {
  let formDefinition = formDefinitionStore.get("definition");

  if (
    formDefinition &&
    typeof formDefinition === "object" &&
    Object.keys(formDefinition).length
  ) {
    return formDefinition;
  }

  // TODO: use checkForNewFormDefinition instead?
  const formDefinitions = await formDefinitionClient.index();
  formDefinition = formDefinitions.data[formDefinitions.data.length - 1];

  formDefinitionStore.set("definition", formDefinition.definition);
  formDefinitionStore.set("version", parseInt(formDefinition.version, 10));
  formDefinitionStore.set(
    "requiredDesktopVersion",
    formDefinition.requiredDesktopVersion,
  );

  return formDefinition.definition;
};

export const checkForNewFormDefinition = async (
  notify = true,
  periodic = false,
) => {
  try {
    const formDefinitions = await formDefinitionClient.index();
    const formDefinition =
      formDefinitions.data[formDefinitions.data.length - 1];

    formDefinitionStore.set("definition", formDefinition.definition);
    formDefinitionStore.set("version", parseInt(formDefinition.version, 10));
    formDefinitionStore.set(
      "requiredDesktopVersion",
      formDefinition.requiredDesktopVersion,
    );

    // TODO:
    // Versioning
    // Update renderer
    // Notifications on new version
  } catch (e) {
    console.error(e);
  }

  if (periodic)
    checkTimeout = setTimeout(
      () => checkForNewFormDefinition(notify, true),
      10000,
    );
};

export const startNewFormDefinitionCheck = () => {
  checkForNewFormDefinition(true, true);
};
