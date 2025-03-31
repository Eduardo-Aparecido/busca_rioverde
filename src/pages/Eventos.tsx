/**
 * Importação dos componentes e dependências necessárias
 * - useState: Hook do React para gerenciamento de estado
 * - motion: Biblioteca de animações Framer Motion
 * - Ícones: Search, Filter do Lucide
 * - Componentes UI personalizados
 * - useSearch: Hook personalizado para busca com Fuse.js
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { EventoCard } from "@/components/EventoCard";
import { CardCarousel } from "@/components/ui/card-carousel";
import { useSearch } from "@/hooks/useSearch";
import { HighlightText } from "@/components/ui/highlight-text";

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Lista de eventos próximos
 * Array de objetos contendo informações sobre os eventos
 * @property id - Identificador único do evento
 * @property titulo - Nome do evento
 * @property imagem - URL da imagem do evento
 * @property data - Data do evento
 * @property hora - Horário do evento
 * @property local - Local onde será realizado
 * @property categoria - Tipo do evento
 */
const eventosProximos = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    data: "06 Jun 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Comédia Stand-Up",
  },
  {
    id: "2",
    titulo: "Show de MPB com Artistas Locais",
    imagem: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
    data: "30 Nov 2023",
    hora: "20:30",
    local: "Teatro Municipal",
    categoria: "Música",
  },
  {
    id: "3",
    titulo: "Feira de Artesanato Regional",
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    data: "01 Dez 2023",
    hora: "10:00 - 18:00",
    local: "Centro de Convenções",
    categoria: "Cultura",
  },
  {
    id: "4",
    titulo: "Apresentação de Dança Contemporânea",
    imagem: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    data: "03 Dez 2023",
    hora: "19:30",
    local: "Teatro Municipal",
    categoria: "Cultura",
  },
  {
    id: "5",
    titulo: "Campeonato de Futsal",
    imagem: "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    data: "05 Dez 2023",
    hora: "14:00",
    local: "Ginásio Municipal",
    categoria: "Esporte",
  },
  {
    id: "6",
    titulo: "Workshop de Fotografia",
    imagem: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    data: "08 Dez 2023",
    hora: "09:00 - 17:00",
    local: "Centro Cultural",
    categoria: "Educação",
  },
];

/**
 * Lista de categorias disponíveis
 * Array de strings com as categorias de eventos
 * Usado para filtrar os eventos e gerar as tabs
 */
const categorias = [
  "Todos",
  "Comédia Stand-Up",
  "Música",
  "Cultura",
  "Esporte",
  "Educação"
];

/**
 * Página Eventos
 * 
 * Página de listagem de eventos da cidade
 * Permite buscar e filtrar eventos por categoria
 * 
 * Características:
 * - Header com título e descrição
 * - Barra de busca com filtro por data
 * - Filtro por categorias em tabs
 * - Grid responsivo de cards
 * - Carrossel em telas mobile
 * - Busca inteligente com Fuse.js
 * - Highlight dos termos buscados
 * - Design responsivo
 * 
 * Estados:
 * - categoriaAtiva: Categoria selecionada nas tabs
 * - searchTerm: Termo de busca atual (gerenciado pelo hook useSearch)
 * - results: Resultados filtrados da busca (gerenciado pelo hook useSearch)
 */
const Eventos = () => {
  // Estado para controle da categoria ativa
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  /**
   * Filtra os eventos pela categoria selecionada
   * Retorna todos os eventos se a categoria for "Todos"
   */
  const eventosFiltrados = eventosProximos.filter(evento => 
    categoriaAtiva === "Todos" || evento.categoria === categoriaAtiva
  );

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-black pt-16 md:pt-0">
      {/* Header da página */}
      <section className="py-12 md:py-16 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader 
              titulo="Eventos" 
              subtitulo="Confira os principais eventos da cidade"
              centered
            />
          </motion.div>
        </div>
      </section>

      {/* Lista de Eventos */}
      <section className="py-12 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <Tabs defaultValue="Todos" onValueChange={setCategoriaAtiva}>
            <TabsList className="mb-8">
              {categorias.map((categoria) => (
                <TabsTrigger key={categoria} value={categoria}>
                  {categoria}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={categoriaAtiva}>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {eventosFiltrados.map((evento) => (
                  <EventoCard 
                    key={evento.id} 
                    {...evento}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Eventos;
