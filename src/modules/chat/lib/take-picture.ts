import * as ImagePicker from "expo-image-picker";

export async function takePicture(
  onSend: (images: { image: string }[]) => void
) {
  if (await ImagePicker.requestCameraPermissionsAsync()) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onSend([{ image: uri }]);
      return uri;
    }
  }
}
