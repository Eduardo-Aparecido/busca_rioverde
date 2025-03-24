import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { LocalCard } from "@/components/LocalCard";

// Dados simulados para desenvolvimento
const locais = [
  {
    id: "1",
    nome: "Café Artesanal",
    imagem: "cafe-artesanal.jpg",
    endereco: "Rua Principal, 123 - Centro",
    categoria: "Restaurantes",
    avaliacao: 4.8,
  },
  {
    id: "2",
    nome: "Parque Municipal",
    imagem: "parque-esportes.jpg",
    endereco: "Av. Principal, 456 - Centro",
    categoria: "Parques",
    avaliacao: 4.5,
  },
  {
    id: "3",
    nome: "Buriti Shopping",
    imagem: "buriti-shopping.jpg",
    endereco: "Av. Rio Verde, 1003 - Buritis II",
    categoria: "Shoppings",
    avaliacao: 4.7,
  },
  {
    id: "4",
    nome: "Bar do Zé",
    imagem: "bar-do-ze.jpg",
    endereco: "Rua das Flores, 789 - Vila Nova",
    categoria: "Bares",
    avaliacao: 4.6,
  },
  {
    id: "5",
    nome: "Bistrô Gourmet",
    imagem: "bistro-gourmet.jpg",
    endereco: "Rua das Artes, 789, Jardim Goiás",
    categoria: "Restaurantes",
    avaliacao: 4.9,
  },
  {
    id: "6",
    nome: "Casa de Shows",
    imagem: "casa-shows.jpg",
    endereco: "Av. da Música, 321 - Centro",
    categoria: "Música ao Vivo",
    avaliacao: 4.8,
  }
];

const categorias = [
  "Todos",
  "Restaurantes",
  "Bares",
  "Parques",
  "Shoppings",
  "Música ao Vivo"
];

const OndeIr = () => {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const locaisFiltrados = locais.filter(local => {
    const matchBusca = local.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === "Todos" || local.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  return (
    <div>
      {/* Header */}
      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
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

      {/* Filtros e Busca */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar lugares..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Locais */}
      <section className="py-8 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="Todos" className="w-full" onValueChange={setCategoriaAtiva}>
            <TabsList className="mb-8 w-full md:w-auto overflow-x-auto scrollbar-hidden">
              {categorias.map((categoria) => (
                <TabsTrigger key={categoria} value={categoria} className="flex-shrink-0">
                  {categoria}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={categoriaAtiva} className="mt-4">
              {locaisFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locaisFiltrados.map((local) => (
                    <LocalCard
                      key={local.id}
                      {...local}
                      patrocinado={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Nenhum local encontrado para sua busca.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default OndeIr;
