import mmkvStorage from "@/lib/storage/mmkv.storage";
import { addMonths, addWeeks } from "date-fns";
import * as StoreReview from "expo-store-review";

const KEY_STORAGE = "NEXT-RATE-APP";
export const rateApp = async () => {
  try {
    if (!(await StoreReview.hasAction())) return false;

    const nextRateApp = mmkvStorage.getString(KEY_STORAGE);

    if (!nextRateApp) {
      mmkvStorage.set(KEY_STORAGE, addWeeks(new Date(), 1).toString());
      return false;
    }

    if (new Date(nextRateApp) > new Date()) return false;

    await StoreReview.requestReview();

    mmkvStorage.set(KEY_STORAGE, addMonths(new Date(), 4).toString());
    return true;
  } catch (e: any) {
    console.log("🚀 ~ rateApp ~ e:", e);
    return false;
  }
};
