import { Button } from "react-native";
import * as StoreReview from "expo-store-review";

const StoreReviewButton = () => {
  const handleStoreReview = async () => {
    if (await StoreReview.hasAction()) {
      await StoreReview.requestReview();
      console.log(2);
    }
  };
  return <Button onPress={handleStoreReview} title="Calificar App" />;
};
export default StoreReviewButton;
