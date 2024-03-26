import codesStore from "./stores/codes";
import * as codeTableClient from "./ukpid-api/codeTable";
import * as codeClient from "./ukpid-api/code";

let checkTimeout;

export const getCodes = async () => {
  return codesStore.store;
};

export const checkForNewCodes = async (notify = true, periodic = false) => {
  try {
    const codeTables = await codeTableClient.index();
    const codes = await codeClient.index();

    for (const codeTable of codeTables.data) {
      codesStore.set(codeTable.name, {
        id: codeTable.id,
        default: codeTable.default,
        codes: codes.data.filter((code) => code.code_table_id === codeTable.id),
      });
    }
  } catch (e) {
    console.error(e);
  }

  if (periodic)
    checkTimeout = setTimeout(() => checkForNewCodes(notify, true), 10000);
};

export const startNewCodesCheck = () => {
  checkForNewCodes(true, true);
};
