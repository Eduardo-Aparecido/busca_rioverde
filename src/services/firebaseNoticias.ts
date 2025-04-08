// firebaseNoticias.ts

import { db } from "@/lib/firebase";
import { getStorage } from "firebase/storage"; // ✅ Importa o storage

// 🔽 Exporta db e storage
export { db };
export const storage = getStorage(); // ✅ Inicializa e exporta o storage

import { collection, addDoc, getDocs } from "firebase/firestore";

export interface Noticia {
  id?: string;
  titulo: string;
  imagem: string;
  galeria: { url: string; descricao: string }[];
  resumo: string;
  conteudo: string;
  data: string;
  autor: string;
  autorImagem: string;
  categoria: string;
  tags: string[];
  endereco: string;
  latitude: number;
  longitude: number;
}

// Adicionar notícia
export async function adicionarNoticiaFirebase(noticia: Noticia) {
  await addDoc(collection(db, "noticias"), noticia);
}

// Buscar todas as notícias
export async function buscarNoticiasFirebase(): Promise<Noticia[]> {
  const querySnapshot = await getDocs(collection(db, "noticias"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Noticia));
}
