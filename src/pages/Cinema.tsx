/**
 * Importação dos componentes e dependências necessárias
 * - useState: Hook do React para gerenciamento de estado
 * - motion: Biblioteca de animações Framer Motion
 * - Ícones: Search, Filter, Calendar do Lucide
 * - Componentes UI personalizados
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardCinema } from "@/components/ui/card-cinema";
import SectionHeader from "@/components/ui/section-header";

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Filmes em cartaz no CINEFLIX
 * Array de objetos contendo informações sobre os filmes
 * @property id - Identificador único do filme
 * @property titulo - Nome do filme
 * @property imagem - URL do poster do filme
 * @property cinema - Nome do cinema
 * @property horarios - Array com horários das sessões
 * @property data - Status do filme (Em cartaz/Em breve) e data
 * @property classificacao - Classificação indicativa
 * @property duracao - Duração do filme
 */
const filmesCineflix = [
  {
    id: "1",
    titulo: "Um Filme Minecraft",
    imagem: "/images/cinemas/cineflix/minecraft.png",
    cinema: "CINEFLIX",
    data: "Em breve | 03/04",
    classificacao: "Livre",
    duracao: "120 MIN",
    genero: "AÇÃO, ANIMAÇÃO",
    descricao: "Quatro desajustados - Garrett 'The Garbage Man' Garrison, Henry, Natalie e Dawn - são..."
  },
  {
    id: "2",
    titulo: "Branca de Neve",
    imagem: "/images/cinemas/cineflix/brancadeneve_02.png",
    cinema: "CINEFLIX",
    data: "Em cartaz",
    classificacao: "10+",
    duracao: "95 MIN",
    genero: "DRAMA",
    descricao: "Inspirado no conto clássico dos Irmãos Grimm, Branca de Neve ganha uma nova adaptação live-action da Disney...."
  },
  {
    id: "3",
    titulo: "Vitória",
    imagem: "/images/cinemas/cineflix/vitoria.png",
    cinema: "CINEFLIX",
    data: "Em cartaz",
    classificacao: "16+",
    duracao: "110 MIN",
    genero: "AÇÃO",
    descricao: "A história real de uma aposentada que desmontou uma quadrilha carioca de traficantes e policiais a partir de filmagens feitas da janela do seu apartamento no Rio de Janeiro..."
  }
];

/**
 * Filmes em cartaz no CINE A
 * Array de objetos contendo informações sobre os filmes
 * Mesma estrutura dos filmes do CINEFLIX
 */
const filmesCineA = [
  {
    id: "4",
    titulo: "Resgate Implacável",
    imagem: "interestelar.jpg",
    cinema: "CINE A",
    data: "Em cartaz",
    classificacao: "16+",
    duracao: "120 MIN",
    genero: "AÇÃO",
    descricao: "Um ex-agente especial precisa resgatar sua filha sequestrada por uma organização criminosa..."
  },
  {
    id: "5",
    titulo: "Zerbasseone The First Tour [Timeless World] in Cinemas",
    imagem: "pantera-negra.jpg",
    cinema: "CINE A",
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "150 MIN",
    genero: "MUSICAL",
    descricao: "Acompanhe a primeira turnê mundial da sensação do K-pop Zerbasseone em uma experiência única..."
  }
];

/**
 * Página Cinema
 * 
 * Página de programação dos cinemas de Rio Verde
 * Exibe os filmes em cartaz e permite filtrar por cinema e data
 * 
 * Características:
 * - Hero section com imagem de fundo e título
 * - Barra de busca para filtrar filmes
 * - Seletor de datas (hoje, amanhã, etc)
 * - Tabs para alternar entre cinemas
 * - Lista de filmes com horários
 * - Animações de transição
 * - Design responsivo
 * 
 * Estados:
 * - cinemaAtivo: Cinema selecionado nas tabs
 * - dataAtiva: Data selecionada nos filtros
 */
const Cinema = () => {
  // Estados para controle dos filtros
  const [cinemaAtivo, setCinemaAtivo] = useState("cineflix");

  /**
   * Retorna os filmes do cinema ativo
   */
  const filmesFiltrados = cinemaAtivo === "cineflix" ? filmesCineflix : filmesCineA;

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-zinc-900 pt-0">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader 
            titulo="Cinema" 
            subtitulo="Confira os filmes em cartaz nos cinemas da cidade"
          />
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
          {filmesFiltrados.map((filme) => (
            <div key={filme.id} className="snap-start shrink-0 w-[48%] md:w-auto">
              <CardCinema {...filme} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cinema;
