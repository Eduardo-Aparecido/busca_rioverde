import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Noticia {
  id: string;
  titulo: string;
  imagem: string;
  galeria: { url: string; descricao?: string }[];
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


interface NoticiaContextType {
  noticias: Noticia[];
  adicionarNoticia: (noticia: Noticia) => void;
}

const NoticiaContext = createContext<NoticiaContextType>({
  noticias: [],
  adicionarNoticia: () => {},
});

export const NoticiaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  // ✅ Carrega as notícias do Firestore ao iniciar
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "noticias"));
        const lista: Noticia[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            data: data.data?.toDate?.() ?? null, // Converte Timestamp para Date
          };
        }) as Noticia[];
        setNoticias(lista);
      } catch (error) {
        console.error("Erro ao buscar notícias do Firebase:", error);
      }
    };

    fetchNoticias();
  }, []);

  // ✅ Adiciona uma nova notícia ao Firestore com id
  const adicionarNoticia = async (noticia: Noticia) => {
    try {
      const docRef = await addDoc(collection(db, "noticias"), noticia);
      await setDoc(docRef, { ...noticia, id: docRef.id });
      setNoticias((prev) => [...prev, { ...noticia, id: docRef.id }]);
    } catch (error) {
      console.error("Erro ao adicionar notícia:", error);
    }
  };

  return (
    <NoticiaContext.Provider value={{ noticias, adicionarNoticia }}>
      {children}
    </NoticiaContext.Provider>
  );
};

export const useNoticias = () => useContext(NoticiaContext);
