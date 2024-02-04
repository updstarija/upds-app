import { StateStorage, createJSONStorage } from "zustand/middleware";
import mmkvStorage from "./mmkv.storage";

const mmkvMiddlewareStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkvStorage.set(name, value);
  },
  getItem: (name) => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return mmkvStorage.delete(name);
  },
};

export default createJSONStorage(() => mmkvMiddlewareStorage);
