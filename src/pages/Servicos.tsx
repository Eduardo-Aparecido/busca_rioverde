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
import { Star } from "lucide-react";

/**
 * Dados simulados para desenvolvimento
 */
const servicos = [
  {
    id: 1,
    titulo: "Faxineira",
    descricao: "Serviço profissional de faxina",
    categoria: "Serviços Domésticos",
    prestador: {
      nome: "Clean House",
      telefone: "(11) 99999-9999",
      whatsapp: "(11) 99999-9999",
      email: "contato@faxineira.com"
    },
    imagem: "/images/servicos/faxineira.jpg"
  },
  {
    id: 2,
    titulo: "Serviço de Dj",
    descricao: "Dj para festas.",
    categoria: "Entretenimento",
    prestador: {
      nome: "DJ Party",
      telefone: "(11) 98888-8888",
      whatsapp: "(11) 98888-8888",
      email: "contato@djparty.com"
    },
    imagem: "/images/servicos/dj.jpg"
  },
  {
    id: 3,
    titulo: "Serviço de Pintura",
    descricao: "Pintura de paredes e tetos",
    categoria: "Reforma",
    prestador: {
      nome: "João Silva",
      telefone: "(11) 97777-7777",
      whatsapp: "(11) 97777-7777",
      email: "joao.pintor@email.com"
    },
    imagem: "/images/servicos/pintor.jpg"
  }
];

/**
 * Lista de categorias disponíveis
 */
const categorias = ["Todos", "Tecnologia", "Limpeza", "Educação"];

/**
 * Componente ServicoCard
 */
function ServicoCard({ id, titulo, imagem, categoria, descricao, avaliacao, avaliacoes, preco, contato }) {
  return (
    <CardBase
      id={id}
      titulo={titulo}
      imagem={imagem}
      link={`/servico/${id}`}
      categoria={categoria}
    >
      <div className="space-y-2">
        {/* Avaliação */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{avaliacao}</span>
          </div>
          <span className="text-sm text-zinc-500">({avaliacoes} avaliações)</span>
        </div>

        {/* Descrição */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{descricao}</p>

        {/* Preço */}
        <div className="text-sm font-medium text-primary">{preco}</div>

        {/* Contato */}
        <div className="text-sm text-zinc-600 dark:text-zinc-400">{contato}</div>
      </div>
    </CardBase>
  );
}

/**
 * Página Servicos
 * 
 * Página de listagem de prestadores de serviços
 * Permite filtrar serviços por categoria
 */
const Servicos = () => {
  // Estado para controle da categoria ativa
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  /**
   * Filtra os serviços pela categoria selecionada
   * Retorna todos os serviços se a categoria for "Todos"
   */
  const servicosFiltrados = servicos.filter(servico => 
    categoriaAtiva === "Todos" || servico.categoria === categoriaAtiva
  );

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-zinc-900 pt-0">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SectionHeader
            titulo="Serviços"
            subtitulo="Encontre os melhores profissionais"
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
                  {servicosFiltrados
                    .filter((item) => categoria === "Todos" || item.categoria === categoria)
                    .map((item) => (
                      <CardBase
                        key={item.id}
                        id={item.id.toString()}
                        titulo={item.titulo}
                        imagem={item.imagem}
                        link={`/servico/${item.id}`}
                        categoria={item.categoria}
                      >
                        <div className="flex flex-col flex-grow">
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">{item.descricao}</p>
                          <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <p className="text-sm font-medium text-primary">{item.prestador.nome}</p>
                          </div>
                        </div>
                      </CardBase>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Servicos; 