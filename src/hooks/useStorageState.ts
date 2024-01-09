import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(
  key: string,
  value: any | null,
  options?: { isObject?: boolean }
) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        if (typeof value !== "string") {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, value);
        }
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await AsyncStorage.removeItem(key);
      //    await SecureStore.deleteItemAsync(key);
    } else {
      if (typeof value !== "string") {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } else {
        await AsyncStorage.setItem(key, value);
      }
    }
  }
}

export function useStorageState<T = string>(
  key: string,
  options?: { isObject?: boolean, initialValue: T }
): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>([true, options?.initialValue || null]);

  // Get
  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          if (options && !options.isObject) {
            setState(localStorage.getItem(key) as T);
          } else {
            const val = localStorage.getItem(key);
            if (val) setState(JSON.parse(val));
          }
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      AsyncStorage.getItem(key).then((value: any) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: T | null) => {
      setStorageItemAsync(key, value, options).then(() => {
        setState(value as T);
      });
    },
    [key]
  );

  return [state, setValue];
}
