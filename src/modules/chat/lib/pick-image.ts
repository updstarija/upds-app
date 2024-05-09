import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export async function pickImage(onSend: (images: { image: string }[]) => void) {
  if (await ImagePicker.requestMediaLibraryPermissionsAsync()) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log("🚀 ~ pickImage ~ result:", result);

    if (!result.canceled) {
      const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB
      console.log("🚀 ~ pickImage ~ maxFileSizeInBytes:", maxFileSizeInBytes);
      const uris = [];

      for (const asset of result.assets) {
        //@ts-expect-error Prop fileSize not exists en props
        if (asset.filesize && asset.filesize <= maxFileSizeInBytes) {
          uris.push({ image: asset.uri });
        } else {
          Toast.show({
            text1: "Error",
            text2: `La imagen '${asset.fileName}' excede el tamaño máximo permitido de 2MB.`,
            type: "error",
          });

          return;
          /*  throw new Error(
            `La imagen '${asset.fileName}' excede el tamaño máximo permitido.`
          ); */
        }
      }

      onSend(uris);
      return uris;
    }
  }
}
