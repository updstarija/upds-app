import * as ImagePicker from "expo-image-picker";

export async function pickImage(onSend: (images: { image: string }[]) => void) {
  if (await ImagePicker.requestMediaLibraryPermissionsAsync()) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onSend([{ image: uri }]);
      return uri;
    }
  }
}
