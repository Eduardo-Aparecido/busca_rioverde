import { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
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
  loadingNoticias: boolean;
  adicionarNoticia: (noticia: Noticia) => void;
}

const NoticiaContext = createContext<NoticiaContextType | undefined>(undefined);

export const NoticiaProvider = ({ children }) => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "noticias"), (snapshot) => {
      const novasNoticias = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Noticia[];

      setNoticias(novasNoticias);
      setLoadingNoticias(false);
    });

    return () => unsubscribe();
  }, []);

  const adicionarNoticia = (nova: Noticia) => {
    setNoticias(prev => [...prev, nova]);
  };

  return (
    <NoticiaContext.Provider value={{ noticias, adicionarNoticia, loadingNoticias }}>
      {children}
    </NoticiaContext.Provider>
  );
};

export const useNoticias = () => {
  const context = useContext(NoticiaContext);
  if (!context) throw new Error("useNoticias deve ser usado dentro de NoticiaProvider");
  return context;
};
