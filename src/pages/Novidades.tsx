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
    titulo: "Nova cafeteria inaugura no centro da cidade",
    imagem: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    resumo: "A cafeteria 'Grão Especial' inaugura nesta semana trazendo opções de cafés especiais e ambiente aconchegante para os moradores de Rio Verde.",
    data: "22 Nov 2023",
    categoria: "Gastronomia",
  },
  {
    id: "2",
    titulo: "Parque da cidade recebe novo espaço para esportes",
    imagem: "https://images.unsplash.com/photo-1526307616774-60d0098f7642",
    resumo: "O Parque Municipal foi revitalizado e agora conta com novas quadras esportivas, pista de skate e academia ao ar livre.",
    data: "20 Nov 2023",
    categoria: "Lazer",
  },
  {
    id: "3",
    titulo: "Festival de Jazz acontecerá em dezembro",
    imagem: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    resumo: "O primeiro Festival de Jazz de Rio Verde reunirá músicos locais e nacionais para apresentações ao vivo durante um final de semana.",
    data: "18 Nov 2023",
    categoria: "Cultura",
  },
  {
    id: "4",
    titulo: "Novo restaurante de comida japonesa abre no shopping",
    imagem: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    resumo: "O 'Sushi Rio' é a nova opção gastronômica da cidade, oferecendo pratos da culinária japonesa com um toque brasileiro.",
    data: "15 Nov 2023",
    categoria: "Gastronomia",
  },
  {
    id: "5",
    titulo: "Exposição de arte local na galeria municipal",
    imagem: "https://images.unsplash.com/photo-1605429523419-d828acb941d9",
    resumo: "Artistas locais expõem suas obras na Galeria Municipal, com entrada gratuita durante todo o mês de dezembro.",
    data: "12 Nov 2023",
    categoria: "Cultura",
  },
  {
    id: "6",
    titulo: "Nova rota turística é inaugurada na região",
    imagem: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318",
    resumo: "A 'Rota das Águas' conecta as principais cachoeiras e rios da região, incentivando o turismo ecológico.",
    data: "10 Nov 2023",
    categoria: "Turismo",
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
    <div className="min-h-screen bg-secondary/50 dark:bg-zinc-900 pt-16">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4">
        {/* Header da página */}
        <section className="py-12 md:py-16 bg-secondary/50 dark:bg-zinc-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader 
              titulo="Novidades" 
              subtitulo="Fique por dentro das últimas notícias da cidade"
              centered
            />
          </motion.div>
        </section>

        {/* Lista de Notícias */}
        <section className="py-12 bg-secondary/50 dark:bg-zinc-900">
          <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
            <Tabs defaultValue="Todos" onValueChange={setCategoriaAtiva}>
              <div className="overflow-x-auto pb-4 scrollbar-none">
                <TabsList className="mb-8 w-fit">
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
        </section>
      </div>
    </div>
  );
};

export default Novidades;
