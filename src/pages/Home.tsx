/**
 * Importação dos componentes e dependências necessárias
 * - Link: Componente de navegação do React Router
 * - ArrowRight: Ícone de seta do Lucide
 * - motion: Biblioteca de animações Framer Motion
 * - Componentes UI personalizados
 * - Componentes de Card específicos
 */
import { Link } from "react-router-dom";
import { ArrowRight, Theater, Calendar, Newspaper, MapPin, Tag, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EventoCard } from "@/components/EventoCard";
import { NoticiaCard } from "@/components/NoticiaCard";
import SectionHeader from "@/components/ui/section-header";
import { StoriesContainer } from "@/components/ui/stories-container";
import { CardCarousel } from "@/components/ui/card-carousel";
import { StoryModal } from "@/components/ui/story-modal";
import { useState } from "react";
import { CardBase } from "@/components/ui/card-base";
import { Story, StoryContent } from "@/types/story";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@/hooks/useSearch";
import { HighlightText } from "@/components/ui/highlight-text";

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Stories em destaque
 * Array de objetos contendo informações sobre os stories
 * Cada story pode ter um ou mais conteúdos (imagens ou vídeos)
 */
const storiesDestaque: Story[] = [
  {
    id: "1",
    titulo: "Cinema",
    imagem: "/images/cinemas/cineflix/brancadeneve.png",
    link: "/cinema",
    conteudo: [
      {
        tipo: "imagem" as const,
        url: "/images/cinemas/cineflix/brancadeneve_02.png",
        duracao: 5,
        descricao: "Confira os últimos lançamentos do cinema!"
      }
    ]
  },
  {
    id: "2",
    titulo: "Classificados",
    imagem: "/images/servicos/anuncie_aqui.png",
    link: "/eventos?categoria=shows",
    conteudo: [
      {
        tipo: "imagem" as const,
        url: "/images/classificados/iphone13promax_03.jpg",
        duracao: 5,
        descricao: "Vendo iPhone 13 Pro Max 256GB, cor Graphite, com garantia"
      }
      // {
      //   tipo: "video" as const,
      //   url: "/videos/show-story.mp4",
      //   duracao: 15
      // },
      // {
      //   tipo: "imagem" as const,
      //   url: "/images/show-story-2.jpg",
      //   duracao: 5
      // }
    ]
  },
  {
    id: "3",
    titulo: "Restaurantes",
    imagem: "/images/onde_ir/finnegans/finnegans_06.png",
    link: "/onde-ir?categoria=restaurantes",
    conteudo: {
      tipo: "imagem" as const,
      url: "/images/onde_ir/finnegans/finnegans_07.png",
      duracao: 5
    }
  }
  
];

/**
 * Eventos em destaque
 * Array de objetos contendo informações sobre eventos principais
 * Exibidos no carrossel de eventos da página inicial
 */
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
    titulo: "4° Edição Café Com Deus",
    imagem: "/images/eventos/cafe_com_deus/cafecomdeus.jpeg",
    data: "12 Abr 2025",
    hora: "10:00",
    local: "Jardim Goias",
    categoria: "Espiritualidade",
    // patrocinado: true
  },
];

/**
 * Notícias recentes
 * Array de objetos contendo as últimas notícias
 * Exibidas na seção de notícias da página inicial
 */
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

/**
 * Classificados em Destaque
 * Array de objetos contendo informações sobre classificados
 * Exibidos na seção de classificados da página inicial
 */
const classificados = [
  {
    id: "1",
    titulo: "Iphone 13 Pro Max",
    imagem: "/images/classificados/iphone13promax.jpg",
    descricao: "Iphone 13 Pro Max 256GB, cor Graphite, com garantia",
    preco: "R$ 4.999,00",
    categoria: "Eletrônicos"
  },
  {
    id: "2",
    titulo: "Bicicleta Aro 29 KRW",
    imagem: "/images/classificados/bicicleta.jpg",
    descricao: "Bicicleta Alumínio Câmbios Shimano 21 Velocidades Freio a Disco Suspensão Mountain Bike S21",
    preco: "R$ 200,00",
    categoria: "Esportes"
  },
  {
    id: "3",
    titulo: "Guitarra Michael GM222N ST STONEHENGE",
    imagem: "/images/classificados/guitarra.jpg",
    descricao: "Guitarra Michael GM222N ST STONEHENGE",
    preco: "R$ 1.200,00",
    categoria: "Instrumentos"
  }
];

/**
 * Serviços em Destaque
 * Array de objetos contendo informações sobre serviços
 * Exibidos na seção de serviços da página inicial
 */
const servicos = [
  {
    id: "1",
    titulo: "Serviço de Limpeza",
    imagem: "/images/servicos/faxineira.jpg",
    descricao: "Limpeza completa do seu lar",
    categoria: "Serviços Domésticos",
    prestador: {
      nome: "Clean House",
      telefone: "(11) 99999-9999",
      whatsapp: "(11) 99999-9999",
      email: "contato@cleanhouse.com"
    }
  },
  {
    id: "2",
    titulo: "Serviço de Dj",
    imagem: "/images/servicos/dj.jpg",
    descricao: "Dj para festas. A pessoa certa para animar o seu evento",
    categoria: "Entretenimento",
    prestador: {
      nome: "DJ Party",
      telefone: "(11) 98888-8888",
      whatsapp: "(11) 98888-8888",
      email: "contato@djparty.com"
    }
  },
  {
    id: "3",
    titulo: "Serviço de Pintura",
    imagem: "/images/servicos/pintor.jpg",
    descricao: "Pintura de paredes e tetos",
    categoria: "Reforma",
    prestador: {
      nome: "João Silva",
      telefone: "(64) 98888-8888",
      whatsapp: "(64) 98888-8888",
      email: "joao.pintor@email.com"
    }
  }
];

/**
 * Página Home
 * 
 * Página inicial do Busca Rio Verde
 * Apresenta as principais seções e conteúdos do site
 * 
 * Características:
 * - Stories em destaque com modal interativo
 * - Carrossel de eventos principais
 * - Seção de notícias recentes
 * - Links para todas as seções do site
 * - Design responsivo
 * - Animações de transição
 * 
 * Estados:
 * - storyAtivo: Armazena o story ativo para exibição no modal
 */
const Home = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);

  const handleOpenStory = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseStory = () => {
    setSelectedStoryIndex(-1);
  };

  const handleStoryChange = (newIndex: number) => {
    setSelectedStoryIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-black pt-16 md:pt-0">
      {/* Stories */}
      <section className="py-8 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <StoriesContainer stories={storiesDestaque} onStoryClick={handleOpenStory} />
        </div>
      </section>

      {/* Eventos em Destaque */}
      <section className="py-12 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader 
              titulo="Eventos em Destaque" 
              subtitulo="Confira os principais eventos da cidade"
            />
            <Link to="/eventos">
              <Button variant="ghost" className="gap-2">
                Ver todos
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {eventosDestaque.map((evento) => (
              <EventoCard key={evento.id} {...evento} />
            ))}
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-12 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader 
              titulo="Últimas Notícias" 
              subtitulo="Fique por dentro das novidades da cidade"
            />
            <Link to="/novidades">
              <Button variant="ghost" className="gap-2">
                Ver todas
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {noticiasRecentes.map((noticia) => (
              <NoticiaCard key={noticia.id} {...noticia} />
            ))}
          </div>
        </div>
      </section>

      {/* Classificados */}
      <section className="py-12 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader 
              titulo="Classificados" 
              subtitulo="Compre e venda na sua cidade"
            />
            <Link to="/classificados">
              <Button variant="ghost" className="gap-2">
                Ver todos
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {classificados.map((classificado) => (
              <CardBase
                key={classificado.id}
                id={classificado.id}
                titulo={classificado.titulo}
                imagem={classificado.imagem}
                link={`/classificados/${classificado.id}`}
              >
                <div className="flex flex-col flex-grow">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">{classificado.descricao}</p>
                  <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-base font-semibold text-primary">{classificado.preco}</p>
                  </div>
                </div>
              </CardBase>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-12 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader 
              titulo="Serviços" 
              subtitulo="Encontre os melhores profissionais"
            />
            <Link to="/servicos">
              <Button variant="ghost" className="gap-2">
                Ver todos
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {servicos.map((servico) => (
              <CardBase
                key={servico.id}
                id={servico.id}
                titulo={servico.titulo}
                imagem={servico.imagem}
                link={`/servico/${servico.id}`}
                categoria={servico.categoria}
              >
                <div className="flex flex-col flex-grow">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">{servico.descricao}</p>
                  <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm font-medium text-primary">{servico.prestador.nome}</p>
                  </div>
                </div>
              </CardBase>
            ))}
          </div>
        </div>
      </section>

      {/* Menu de Navegação */}
      <section className="py-12 bg-secondary/50 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/cinema" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Theater className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Cinema</span>
            </Link>
            <Link to="/eventos" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Calendar className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Eventos</span>
            </Link>
            <Link to="/novidades" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Newspaper className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Novidades</span>
            </Link>
            <Link to="/onde-ir" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <MapPin className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Onde Ir</span>
            </Link>
            <Link to="/classificados" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Tag className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Classificados</span>
            </Link>
            <Link to="/servicos" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Wrench className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Serviços</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal de Story */}
      {selectedStoryIndex >= 0 && (
        <StoryModal
          story={storiesDestaque[selectedStoryIndex]}
          allStories={storiesDestaque}
          currentIndex={selectedStoryIndex}
          onClose={handleCloseStory}
          onStoryChange={handleStoryChange}
        />
      )}
    </div>
  );
};

export default Home;
