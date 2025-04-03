/**
 * Importação dos componentes e dependências necessárias
 * - useState: Hook do React para gerenciamento de estado
 * - motion: Biblioteca de animações Framer Motion
 * - Componentes UI personalizados
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { LocalCard } from "@/components/LocalCard";
import { CardCarousel } from "@/components/ui/card-carousel";
import { useSearch } from "@/hooks/useSearch";
import { HighlightText } from "@/components/ui/highlight-text";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Lista de estabelecimentos
 * Array de objetos contendo informações sobre os locais
 * @property id - Identificador único do local
 * @property nome - Nome do estabelecimento
 * @property imagem - URL da imagem do local
 * @property endereco - Endereço completo
 * @property categoria - Tipo do estabelecimento
 * @property avaliacao - Nota de 0 a 5
 */
const locais = [
  {
    id: "1",
    nome: "Finnegans",
    imagem: "/images/onde_ir/finnegans/finnegans_07.png",
    endereco: "Centro",
    categoria: "Restaurantes",
    avaliacao: 4.8,
  },
  {
    id: "2",
    nome: "Boteco do Pão",
    imagem: "/images/onde_ir/boteco-do-pao/botecodopao4.jpg",
    endereco: "Morada do Sol",
    categoria: "Bares",
    avaliacao: 4.5,
  },
  {
    id: "3",
    nome: "Stur Bier",
    imagem: "/images/onde_ir/stur-bier/stur-banner.png",
    endereco: "DIMPE",
    categoria: "Música ao Vivo",
    avaliacao: 4.7,
  },
  {
    id: "4",
    nome: "Bar do Zé",
    imagem: "/images/onde_ir/bar_ze/bar_01.jpg",
    endereco: "Rua das Flores, 789 - Vila Nova",
    categoria: "Bares",
    avaliacao: 4.6,
  },
  {
    id: "5",
    nome: "Bistrô Gourmet",
    imagem: "/images/onde_ir/bistro/bistro_01.jpg",
    endereco: "Rua das Artes, 789, Jardim Goiás",
    categoria: "Restaurantes",
    avaliacao: 4.9,
  },
  {
    id: "6",
    nome: "Casa de Shows",
    imagem: "/images/onde_ir/casa_shows/casa_01.jpg",
    endereco: "Av. da Música, 321 - Centro",
    categoria: "Música ao Vivo",
    avaliacao: 4.8,
  }
];

/**
 * Lista de categorias disponíveis
 * Array de strings com as categorias de estabelecimentos
 * Usado para filtrar os locais e gerar as tabs
 */
const categorias = [
  "Todos",
  "Restaurantes",
  "Bares",
  "Parques",
  "Shoppings",
  "Música ao Vivo"
];

/**
 * Página OndeIr
 * 
 * Página de listagem de estabelecimentos e pontos turísticos
 * Permite buscar e filtrar locais por categoria
 * 
 * Características:
 * - Header com título e descrição
 * - Barra de busca centralizada
 * - Filtro por categorias em tabs
 * - Grid responsivo de cards
 * - Carrossel em telas mobile
 * - Busca inteligente com Fuse.js
 * - Highlight dos termos buscados
 * - Design responsivo
 * 
 * Estados:
 * - categoriaAtiva: Categoria selecionada nas tabs
 */
const OndeIr = () => {
  // Estado para controle da categoria ativa
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  /**
   * Filtra os locais pela categoria selecionada
   * Retorna todos os locais se a categoria for "Todos"
   */
  const locaisFiltrados = locais.filter(local => 
    categoriaAtiva === "Todos" || local.categoria === categoriaAtiva
  );

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-zinc-900 pt-16 md:pt-0">
      {/* Header da página */}
      <section className="py-12 md:py-16 bg-secondary/50 dark:bg-zinc-900">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader 
              titulo="Onde Ir" 
              subtitulo="Descubra os melhores lugares para visitar em Rio Verde"
              centered
            />
          </motion.div>
        </div>
      </section>

      {/* Lista de Locais */}
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
                {locaisFiltrados.map((local) => (
                  <div key={local.id} className="snap-start shrink-0 w-[48%] md:w-auto">
                    <Link
                      to={`/onde-ir/${local.id}`}
                      className="block h-full"
                    >
                      <div className="group bg-white dark:bg-black rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 transition-colors">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={local.imagem}
                            alt={local.nome}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-white/90 dark:bg-black/90 text-zinc-900 dark:text-white">
                              {local.categoria}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col h-[120px]">
                          <h3 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-2">
                            {local.nome}
                          </h3>
                          <div className="mt-auto flex items-center gap-2">
                            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{local.endereco}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default OndeIr;
