import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardCinema } from "@/components/ui/card-cinema";

// Dados simulados para desenvolvimento
const filmesCineflix = [
  {
    id: "1",
    titulo: "Spider-Man: Sem Volta para Casa",
    imagem: "spider-man.jpg",
    cinema: "CINEFLIX (Buriti Shopping)",
    horarios: ["14:30", "17:45", "21:00", "23:30"],
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "2h 28min",
  },
  {
    id: "2",
    titulo: "Vingadores: Ultimato",
    imagem: "vingadores-ultimato.jpg",
    cinema: "CINEFLIX (Buriti Shopping)",
    horarios: ["14:30", "17:45", "21:00", "23:30"],
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "3h 2min",
  },
  {
    id: "3",
    titulo: "Duna",
    imagem: "duna.jpg",
    cinema: "CINEFLIX (Buriti Shopping)",
    horarios: ["15:00", "18:15", "21:30"],
    data: "Em cartaz",
    classificacao: "14+",
    duracao: "2h 35min",
  }
];

const filmesCineA = [
  {
    id: "4",
    titulo: "Interestelar",
    imagem: "interestelar.jpg",
    cinema: "CINE A (Shopping Rio Verde)",
    horarios: ["14:00", "17:30", "21:15"],
    data: "Em cartaz",
    classificacao: "10+",
    duracao: "2h 49min",
  },
  {
    id: "5",
    titulo: "Pantera Negra",
    imagem: "pantera-negra.jpg",
    cinema: "CINE A (Shopping Rio Verde)",
    horarios: ["14:45", "18:00", "21:45"],
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "2h 15min",
  }
];

const Cinema = () => {
  const [busca, setBusca] = useState("");
  const [cinemaAtivo, setCinemaAtivo] = useState("cineflix");
  const [dataAtiva, setDataAtiva] = useState("hoje");

  const filmesFiltrados = cinemaAtivo === "cineflix"
    ? filmesCineflix.filter(filme => filme.titulo.toLowerCase().includes(busca.toLowerCase()))
    : filmesCineA.filter(filme => filme.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/cinema-hero.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-zinc-900" />
        </div>
        
        <div className="container mx-auto px-4 h-full relative">
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Cinema em Rio Verde
              </h1>
              <p className="text-lg text-zinc-300">
                Confira a programação dos melhores cinemas da cidade e garanta seu ingresso
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-8 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Busca */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar filmes..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {/* Datas */}
            <div className="flex gap-2">
              {["hoje", "amanhã", "sábado", "domingo"].map((data) => (
                <Button
                  key={data}
                  variant={dataAtiva === data ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setDataAtiva(data)}
                  className={`
                    gap-2 capitalize
                    ${dataAtiva === data 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "border-white/10 text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Calendar className="h-4 w-4" />
                  {data}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Filmes */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="cineflix" 
            className="w-full" 
            onValueChange={setCinemaAtivo}
          >
            <TabsList className="mb-8 w-full md:w-auto bg-white/5 border-b border-white/10">
              <TabsTrigger 
                value="cineflix" 
                className="flex-1 md:flex-none data-[state=active]:bg-white data-[state=active]:text-black"
              >
                CINEFLIX (Buriti Shopping)
              </TabsTrigger>
              <TabsTrigger 
                value="cinea" 
                className="flex-1 md:flex-none data-[state=active]:bg-white data-[state=active]:text-black"
              >
                CINE A (Shopping Rio Verde)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="cineflix" className="space-y-6 mt-4">
              {filmesFiltrados.length > 0 ? (
                filmesFiltrados.map((filme) => (
                  <motion.div
                    key={filme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CardCinema {...filme} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-zinc-400">Nenhum filme encontrado para sua busca.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cinea" className="space-y-6 mt-4">
              {filmesFiltrados.length > 0 ? (
                filmesFiltrados.map((filme) => (
                  <motion.div
                    key={filme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CardCinema {...filme} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-zinc-400">Nenhum filme encontrado para sua busca.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Cinema;
