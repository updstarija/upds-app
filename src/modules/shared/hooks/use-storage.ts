import storageService, { UploadFile } from "@/services/storage-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useStorage = () => {
  const queryClient = useQueryClient();

  const uploadFileMutation = useMutation({
    mutationFn: (data: UploadFile) => storageService.uploadImage(data),
    onError: (e: any) => {
      console.log("🚀 ~ useStorage ~ e:", e);
      throw new Error(e.message);
    },
  });
  return {
    uploadFileMutation,
  };
};
