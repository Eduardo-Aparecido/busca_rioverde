/**
 * Importação dos componentes e dependências necessárias
 * - useState: Hook do React para gerenciamento de estado
 * - motion: Biblioteca de animações Framer Motion
 * - Componentes UI personalizados
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { NoticiaCard } from "@/components/NoticiaCard";
import { CardCarousel } from "@/components/ui/card-carousel";
import { useSearch } from "@/hooks/useSearch";
import { HighlightText } from "@/components/ui/highlight-text";

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Lista de notícias
 * Array de objetos contendo informações sobre as notícias
 * @property id - Identificador único da notícia
 * @property titulo - Título da notícia
 * @property imagem - URL da imagem da notícia
 * @property resumo - Texto resumido da notícia
 * @property data - Data de publicação
 * @property categoria - Tipo da notícia
 */
const noticias = [
  {
    id: "1",
    titulo: "Novo Hosp. Municipal Universitário",
    imagem: "/images/noticias/hmurv1.jpg",
    resumo: "Saúde e Educação em um Só Lugar!",
    data: "17 Dez 2024",
    categoria: "Saúde",
  },
  

];

/**
 * Lista de categorias disponíveis
 * Array de strings com as categorias de notícias
 * Usado para filtrar as notícias e gerar as tabs
 */
const categorias = ["Todos", "Cultura", "Gastronomia", "Lazer", "Turismo", "Notícias"];

/**
 * Página Novidades
 * 
 * Página de listagem de notícias e novidades da cidade
 * Permite buscar e filtrar notícias por categoria
 * 
 * Características:
 * - Header com título e descrição
 * - Barra de busca centralizada
 * - Filtro por categorias em tabs
 * - Grid responsivo de cards
 * - Carrossel em telas mobile
 * - Busca inteligente com Fuse.js
 * - Highlight dos termos buscados no título e resumo
 * - Design responsivo
 * 
 * Estados:
 * - categoriaAtiva: Categoria selecionada nas tabs
 * - searchTerm: Termo de busca atual (gerenciado pelo hook useSearch)
 * - results: Resultados filtrados da busca (gerenciado pelo hook useSearch)
 */
const Novidades = () => {
  // Estado para controle da categoria ativa
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  /**
   * Filtra as notícias pela categoria selecionada
   * Retorna todas as notícias se a categoria for "Todos"
   */
  const noticiasFiltradas = noticias.filter(noticia => 
    categoriaAtiva === "Todos" || noticia.categoria === categoriaAtiva
  );

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-zinc-900 pt-0">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4 py-4">
        {/* Header mais compacto, como em Cinema */}
        <div className="flex items-center justify-between mb-4">
          <SectionHeader 
            titulo="Novidades" 
            subtitulo="Fique por dentro das últimas notícias da cidade"
          />
        </div>

        {/* Tabs e Cards */}
        <Tabs defaultValue="Todos" onValueChange={setCategoriaAtiva}>
          <div className="overflow-x-auto pb-4 scrollbar-none">
            <TabsList className="mb-4">
              {categorias.map((categoria) => (
                <TabsTrigger key={categoria} value={categoria}>
                  {categoria}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={categoriaAtiva}>
            <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
              {noticiasFiltradas.map((noticia) => (
                <div key={noticia.id} className="snap-start shrink-0 w-[48%] md:w-auto">
                  <NoticiaCard 
                    key={noticia.id} 
                    {...noticia}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Novidades;
