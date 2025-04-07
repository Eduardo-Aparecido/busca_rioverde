import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importando a biblioteca para gerar IDs únicos

// Definindo a interface para uma notícia
interface Noticia {
  id: string;
  titulo: string;
  imagem: string;
  galeria: string[];
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

// Criando o contexto
const NoticiaContext = createContext<{
  noticias: Noticia[];
  adicionarNoticia: (noticia: Noticia) => void;
  removerNoticia: (id: string) => void; // Função para remover notícia
}>({ noticias: [], adicionarNoticia: () => {}, removerNoticia: () => {} });

// Provedor do contexto
export const NoticiaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  const adicionarNoticia = (noticia: Noticia) => {
    // Verifica se a notícia já existe
    if (!noticias.some(n => n.id === noticia.id)) {
      setNoticias(prev => [...prev, { ...noticia, id: uuidv4() }]); // Gera um ID único
    }
  };

  const removerNoticia = (id: string) => {
    setNoticias(prev => prev.filter(noticia => noticia.id !== id)); // Remove a notícia pelo ID
  };

  return (
    <NoticiaContext.Provider value={{ noticias, adicionarNoticia, removerNoticia }}>
      {children}
    </NoticiaContext.Provider>
  );
};

// Hook para usar o contexto
export const useNoticias = () => {
  return useContext(NoticiaContext);
};
