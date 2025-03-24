import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { NoticiaCard } from "@/components/NoticiaCard";

// Dados simulados para desenvolvimento
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

const categorias = ["Todos", "Cultura", "Gastronomia", "Lazer", "Turismo", "Notícias"];

const Novidades = () => {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const noticiasFiltradas = noticias.filter(noticia => {
    const matchBusca = noticia.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === "Todos" || noticia.categoria === categoriaAtiva;
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
              titulo="Novidades" 
              subtitulo="Fique por dentro das últimas notícias e novidades da cidade"
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
                placeholder="Buscar notícias..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Notícias */}
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
              {noticiasFiltradas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noticiasFiltradas.map((noticia) => (
                    <NoticiaCard
                      key={noticia.id}
                      {...noticia}
                      patrocinado={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Nenhuma notícia encontrada para sua busca.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Novidades;
