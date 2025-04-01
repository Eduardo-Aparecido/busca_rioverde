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
import { eventos } from "@/data/eventos";

/**
 * Lista de categorias disponíveis
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
  const eventosFiltrados = eventos.filter(evento => 
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
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
