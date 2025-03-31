/**
 * Importação dos componentes e dependências necessárias
 * - useState: Hook do React para gerenciamento de estado
 * - motion: Biblioteca de animações Framer Motion
 * - Componentes UI personalizados
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { CardBase } from "@/components/ui/card-base";

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Lista de classificados
 * Array de objetos contendo informações sobre os classificados
 */
const classificados = [
  {
    id: "1",
    titulo: "iPhone 13 Pro Max",
    preco: "R$ 4.999,00",
    descricao: "iPhone 13 Pro Max 256GB, cor Graphite, com garantia",
    categoria: "Eletrônicos",
    contato: {
      telefone: "(11) 99999-9999",
      whatsapp: "(11) 99999-9999",
      email: "vendedor@email.com"
    },
    imagem: "/images/classificados/iphone13promax.jpg"
  },
  {
    id: "2",
    titulo: "Bicicleta Aro 29 KRW",
    preco: "R$ 200,00",
    descricao: "Bicicleta Alumínio Câmbios Shimano 21 Velocidades Freio a Disco Suspensão Mountain Bike S21",
    categoria: "Esportes",
    contato: {
      telefone: "(11) 98888-8888",
      whatsapp: "(11) 98888-8888",
      email: "vendedor2@email.com"
    },
    imagem: "/images/classificados/bicicleta.jpg"
  },
  {
    id: "3",
    titulo: "Guitarra Michael GM222N ST STONEHENGE",
    preco: "R$ 1.200,00",
    descricao: "Guitarra Michael GM222N ST STONEHENGE",
    categoria: "Instrumentos",
    contato: {
      telefone: "(11) 97777-7777",
      whatsapp: "(11) 97777-7777",
      email: "vendedor3@email.com"
    },
    imagem: "/images/classificados/guitarra.jpg"
  }
];

/**
 * Lista de categorias disponíveis
 * Array de strings com as categorias de classificados
 */
const categorias = ["Todos", "Eletrônicos", "Veículos", "Imóveis"];

/**
 * Componente ClassificadoCard
 */
function ClassificadoCard({ id, titulo, imagem, preco, categoria, descricao, data, contato }) {
  return (
    <CardBase
      id={id}
      titulo={titulo}
      imagem={imagem}
      link={`/classificado/${id}`}
      categoria={categoria}
    >
      <div className="space-y-2">
        <div className="text-lg font-bold text-primary">{preco}</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{descricao}</p>
        <div className="text-sm text-zinc-500 dark:text-zinc-500">{data}</div>
        <div className="text-sm font-medium text-primary">{contato}</div>
      </div>
    </CardBase>
  );
}

/**
 * Página Classificados
 * 
 * Página de listagem de classificados
 * Permite filtrar classificados por categoria
 */
const Classificados = () => {
  // Estado para controle da categoria ativa
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  /**
   * Filtra os classificados pela categoria selecionada
   * Retorna todos os classificados se a categoria for "Todos"
   */
  const classificadosFiltrados = classificados.filter(classificado => 
    categoriaAtiva === "Todos" || classificado.categoria === categoriaAtiva
  );

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-black pt-16 md:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4 py-8"
      >
        <SectionHeader
          titulo="Classificados"
          subtitulo="Compre e venda na sua cidade"
        />

        <Tabs defaultValue="Todos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {categorias.map((categoria) => (
              <TabsTrigger key={categoria} value={categoria}>
                {categoria}
              </TabsTrigger>
            ))}
          </TabsList>

          {categorias.map((categoria) => (
            <TabsContent key={categoria} value={categoria}>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {classificadosFiltrados
                  .filter((item) => categoria === "Todos" || item.categoria === categoria)
                  .map((item) => (
                    <CardBase
                      key={item.id}
                      id={item.id.toString()}
                      titulo={item.titulo}
                      imagem={item.imagem}
                      link={`/classificado/${item.id}`}
                      categoria={item.categoria}
                    >
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">{item.descricao}</p>
                        <p className="text-base font-semibold text-primary">{item.preco}</p>
                      </div>
                    </CardBase>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Classificados; 