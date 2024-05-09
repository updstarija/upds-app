import storage from "@react-native-firebase/storage";

type FolderNameStorage = "chat";

export type UploadFile = {
  uri: string;
  folderName: FolderNameStorage;
};

const uploadFile = async ({ uri, folderName }: UploadFile): Promise<string> => {
  try {
    const fileExtension = uri.split(".").pop();
    const uniqueId = Date.now() + Math.random().toString(36).substring(7);
    const imageName = `${uniqueId}.${fileExtension}`;

    const reference = storage().ref(`${folderName}/${imageName}`);
    await reference.putFile(uri);
    const downloadUrl = await reference.getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};

export default {
  uploadImage: uploadFile,
};
