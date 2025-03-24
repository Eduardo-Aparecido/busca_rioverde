import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { EventoCard } from "@/components/EventoCard";

// Dados simulados para desenvolvimento
const eventosProximos = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/caroldelgado.png",
    data: "24 Nov 2023",
    hora: "19:00",
    local: "Praça Central",
    categoria: "Gastronomia",
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

const categorias = ["Todos", "Gastronomia", "Música", "Cultura", "Esporte", "Educação"];

const Eventos = () => {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const eventosFiltrados = eventosProximos.filter(evento => {
    const matchBusca = evento.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === "Todos" || evento.categoria === categoriaAtiva;
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
              titulo="Eventos" 
              subtitulo="Descubra os próximos eventos em Rio Verde e região"
              centered
            />
          </motion.div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar eventos..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="hidden md:flex">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar por data
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Eventos */}
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
              {eventosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventosFiltrados.map((evento) => (
                    <EventoCard
                      key={evento.id}
                      {...evento}
                      patrocinado={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Nenhum evento encontrado para sua busca.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Eventos;
