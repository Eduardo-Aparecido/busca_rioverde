import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EventoCard } from "@/components/EventoCard";
import { NoticiaCard } from "@/components/NoticiaCard";
import SectionHeader from "@/components/ui/section-header";
import { StoriesContainer } from "@/components/ui/stories-container";

// Dados simulados para desenvolvimento
const storiesDestaque = [
  {
    id: "1",
    titulo: "Café Novo",
    imagem: "/images/cafe-capa.jpg",
    link: "/onde-ir?categoria=cafes",
    conteudo: [
      {
        tipo: "imagem" as const,
        url: "/images/cafe-story-1.jpg",
        duracao: 5 // 5 segundos
      },
      {
        tipo: "imagem" as const,
        url: "/images/cafe-story-2.jpg",
        duracao: 5 // 5 segundos
      },
      {
        tipo: "video" as const,
        url: "/videos/cafe-story.mp4",
        duracao: 10 // 10 segundos
      }
    ]
  },
  {
    id: "2",
    titulo: "Shows",
    imagem: "/images/shows-capa.jpg",
    link: "/eventos?categoria=shows",
    conteudo: [
      {
        tipo: "imagem" as const,
        url: "/images/show-story-1.jpg",
        duracao: 5
      },
      {
        tipo: "video" as const,
        url: "/videos/show-story.mp4",
        duracao: 15
      },
      {
        tipo: "imagem" as const,
        url: "/images/show-story-2.jpg",
        duracao: 5
      }
    ]
  },
  {
    id: "3",
    titulo: "Restaurantes",
    imagem: "/images/restaurantes-story.jpg",
    link: "/onde-ir?categoria=restaurantes",
    conteudo: {
      tipo: "video" as const,
      url: "/videos/restaurantes-story.mp4",
      duracao: 10 // 10 segundos
    }
  },
  {
    id: "4",
    titulo: "Bares",
    imagem: "/images/bares-story.jpg",
    link: "/onde-ir?categoria=bares",
    conteudo: {
      tipo: "imagem" as const,
      url: "/images/bares-story-full.jpg"
      // usando duração padrão de 5 segundos
    }
  },
  {
    id: "5",
    titulo: "Parques",
    imagem: "/images/parques-story.jpg",
    link: "/onde-ir?categoria=parques",
    conteudo: {
      tipo: "video" as const,
      url: "/videos/parques-story.mp4",
      duracao: 12 // 12 segundos
    }
  },
  {
    id: "6",
    titulo: "Teatros",
    imagem: "/images/teatros-story.jpg",
    link: "/eventos?categoria=teatro",
    conteudo: {
      tipo: "imagem" as const,
      url: "/images/teatros-story-full.jpg",
      duracao: 7 // 7 segundos
    }
  },
  {
    id: "7",
    titulo: "Esportes",
    imagem: "/images/esportes-story.jpg",
    link: "/eventos?categoria=esportes",
    conteudo: {
      tipo: "video" as const,
      url: "/videos/esportes-story.mp4",
      duracao: 8 // 8 segundos
    }
  },
  {
    id: "8",
    titulo: "Festas",
    imagem: "/images/festas-story.jpg",
    link: "/eventos?categoria=festas",
    conteudo: {
      tipo: "imagem" as const,
      url: "/images/festas-story-full.jpg",
      duracao: 6 // 6 segundos
    }
  }
];

const eventosDestaque = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    data: "06 Jun 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Comédia Stand-Up",
    // patrocinado: true
  },
  {
    id: "2",
    titulo: "Banda Rocco Tributo",
    imagem: "/images/eventos/banda_rocco/bandarocco_01.jpeg",
    data: "12 Abr 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Música"
  },
  {
    id: "3",
    titulo: "4° EDIÇÃO CAFÉ COM DEUS4° EDIÇÃO CAFÉ COM DEUS | ENCONTRO COM MULHERES | POR FERNANDA XIMENES",
    imagem: "/images/eventos/cafe_com_deus/cafecomdeus.jpeg",
    data: "12 Abr 2025",
    hora: "10:00 - 18:00",
    local: "Rua Costa Gomes, 855, CENTRO, Jardim Goias",
    categoria: "Espiritualidade",
    // patrocinado: true
  },
];

const noticiasRecentes = [
  {
    id: "1",
    titulo: "Nova cafeteria inaugura no centro da cidade",
    imagem: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    resumo: "A cafeteria 'Grão Especial' inaugura nesta semana trazendo opções de cafés especiais e ambiente aconchegante para os moradores de Rio Verde.",
    data: "22 Nov 2023",
    categoria: "Gastronomia",
    // patrocinado: true
  },
  {
    id: "2",
    titulo: "Parque da cidade recebe novo espaço para esportes",
    imagem: "https://images.unsplash.com/photo-1526307616774-60d0098f7642",
    resumo: "O Parque Municipal foi revitalizado e agora conta com novas quadras esportivas, pista de skate e academia ao ar livre.",
    data: "20 Nov 2023",
    categoria: "Lazer"
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section - Removed flash effect and animation states */}
      <section className="relative h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        
        <div className="relative container mx-auto h-full flex items-center px-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Descubra os melhores eventos de Rio Verde
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Filmes, shows, gastronomia e muito mais. Tudo em um só lugar para você aproveitar o melhor da cidade.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/eventos">Ver Eventos</Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                  <Link to="/cinema">Cinema</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <StoriesContainer stories={storiesDestaque} />
        </div>
      </section>

      {/* Eventos em Destaque */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <SectionHeader 
              titulo="Eventos em Destaque" 
              subtitulo="Não perca os eventos mais aguardados da cidade"
            />
            
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/eventos" className="flex items-center">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosDestaque.map((evento) => (
              <EventoCard
                key={evento.id}
                {...evento}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/eventos" className="flex items-center justify-center">
                Ver todos os eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Últimas Novidades */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <SectionHeader 
              titulo="Últimas Novidades" 
              subtitulo="Fique por dentro das notícias mais recentes da cidade"
            />
            
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/novidades" className="flex items-center">
                Ver mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticiasRecentes.map((noticia) => (
              <NoticiaCard
                key={noticia.id}
                {...noticia}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/novidades" className="flex items-center justify-center">
                Ver todas as novidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-accent/10 p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Descubra os melhores lugares para visitar
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Restaurantes, bares, parques e muito mais. Encontre recomendações de lugares incríveis para visitar em Rio Verde.
                </p>
                
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/onde-ir">Explorar Lugares</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
