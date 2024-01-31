import ElectronStore from "electron-store";
import { safeStorage } from "electron";

class UkpidStore extends ElectronStore {
  #encryptedEncoding = "latin1";

  constructor(name, schema) {
    super({
      name,
      schema,
    });
  }

  #encryptText(text) {
    try {
      if (!safeStorage.isEncryptionAvailable()) {
        return false;
      }

      return safeStorage.encryptString(text);
    } catch (err) {
      return false;
    }
  }

  #decryptText(text) {
    try {
      if (!safeStorage.isEncryptionAvailable()) {
        return false;
      }

      return safeStorage.decryptString(text);
    } catch (err) {
      return false;
    }
  }

  setEncrypted(key, value) {
    this.set(key, this.#encryptText(value).toString(this.#encryptedEncoding));
  }

  getEncrypted(key) {
    const value = this.get(key);

    if (!value) return false;

    return this.#decryptText(Buffer.from(value, this.#encryptedEncoding));
  }
}

export default UkpidStore;
