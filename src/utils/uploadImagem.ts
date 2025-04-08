// src/utils/uploadImagem.ts
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImagem = async (file: File, pasta: string = "noticias") => {
  const nomeArquivo = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `${pasta}/${nomeArquivo}`);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
