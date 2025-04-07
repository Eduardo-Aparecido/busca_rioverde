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
import { useNoticias } from "@/data/NoticiaContext";

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
      },
      {
        tipo: "imagem" as const,
        url: "/images/cinemas/cineflix/brancadeneve.png",
        duracao: 5,
        descricao: "Branca de Neve e os Sete Anões - Em cartaz!"
      },
      {
        tipo: "imagem" as const,
        url: "/images/cinemas/cineflix/brancadeneve_03.png",
        duracao: 5,
        descricao: "Não perca essa aventura mágica!"
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
        descricao: "iPhone 13 Pro Max - 256GB"
      },
      {
        tipo: "imagem" as const,
        url: "/images/classificados/iphone13promax_02.jpg",
        duracao: 5,
        descricao: "Câmera profissional com 3 lentes"
      },
      {
        tipo: "imagem" as const,
        url: "/images/classificados/iphone13promax.jpg",
        duracao: 5,
        descricao: "Apenas R$ 4.999,00 - Aceito cartão!"
      }
    ]
  },
  {
    id: "3",
    titulo: "Restaurantes",
    imagem: "/images/onde_ir/finnegans/finnegans_06.png",
    link: "/onde-ir?categoria=restaurantes",
    conteudo: [
      {
      tipo: "imagem" as const,
      url: "/images/onde_ir/finnegans/finnegans_07.png",
        duracao: 5,
        descricao: "Conheça o Finnegans!"
      },
      {
        tipo: "imagem" as const,
        url: "/images/onde_ir/finnegans/finnegans_02.png",
        duracao: 5,
        descricao: "Ambiente aconchegante e climatizado"
      },
      {
        tipo: "imagem" as const,
        url: "/images/onde_ir/finnegans/finnegans_03.png",
        duracao: 5,
        descricao: "Cardápio variado com as melhores opções"
      }
    ]
  }/**,
  {
    id: "4",
    titulo: "Instagram",
    imagem: "/images/ghibli.png",
    link: " ",
    conteudo: [
      {
        tipo: "video" as const,
        url: "/videos/story-instagram.mp4",
        duracao: 5,
        descricao: "Teste de video!"
      }
    ]
  }*/
];

/**
 * Eventos em destaque
 * Array de objetos contendo informações sobre eventos principais
 * Exibidos no carrossel de eventos da página inicial
 */
const eventosDestaque = [
  {
    id: "1",
    titulo: "Carol Delgado",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    data: "06 Jun 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer",
    categoria: "Comédia Stand-Up",
    patrocinado: false
  },
  {
    id: "2",
    titulo: "Banda Rocco Tributo",
    imagem: "/images/eventos/banda_rocco/bandarocco_01.jpeg",
    data: "12 Abr 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer",
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
    patrocinado: false
  },
  {
    id: "4",
    titulo: "Galpão da Ultra Pub",
    imagem: "/images/eventos/galpao_ultra/galpaoultra-banner.jpg",
    data: "26 Abr 2025",
    hora: "22:00",
    local: "Centro",
    categoria: "Musica",
    patrocinado: false
  }
];

/**
 * Notícias recentes
 * Array de objetos contendo as últimas notícias
 * Exibidas na seção de notícias da página inicial
 */
const noticiasRecentes = [
  
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
 * Página inicial do Routis
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
  const { noticias } = useNoticias();

  const handleOpenStory = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseStory = () => {
    setSelectedStoryIndex(-1);
  };

  const handleStoryChange = (newIndex: number) => {
    setSelectedStoryIndex(newIndex);
  };

  const noticiasRecentes = noticias.slice(-3);

  return (
    <div className="min-h-screen bg-peach-100 md:bg-peach-100 dark:bg-zinc-900 pt-16">
      {/* Stories */}
      <section className="-mt-[120px] md:mt-0 bg-peach dark:bg-zinc-900">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto">
          <StoriesContainer stories={storiesDestaque} onStoryClick={handleOpenStory} />
        </div>
      </section>

      {/* Eventos em Destaque */}
      <section className="py-12 bg-peach-100 md:bg-peach-100 dark:bg-zinc-900">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4">
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

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
            {eventosDestaque.map((evento) => (
              <div key={evento.id} className="snap-start shrink-0 w-[48%] md:w-auto">
                <EventoCard {...evento} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-12 bg-peach md:bg-peach dark:bg-zinc-900">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4">
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

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
            {noticiasRecentes.map((noticia) => (
              <div key={noticia.id} className="snap-start shrink-0 w-[48%] md:w-auto">
                <NoticiaCard {...noticia} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classificados */}
      <section className="py-12 bg-peach md:bg-peach dark:bg-zinc-900">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader 
              titulo="Classificados" 
              subtitulo="Compre e venda na sua cidade"
            />
            <Link to="/classificado">
              <Button variant="ghost" className="gap-2">
                Ver todos
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
            {classificados && classificados.map((classificado) => (
              <div key={classificado.id} className="snap-start shrink-0 w-[48%] md:w-auto">
              <CardBase
                id={classificado.id}
                titulo={classificado.titulo}
                imagem={classificado.imagem}
                  link={`/classificado/${classificado.id}`}
              >
                <div className="flex flex-col flex-grow">
                    <p className="text-sm text-zinc-900 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">{classificado.descricao}</p>
                  <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-base font-semibold text-primary">{classificado.preco}</p>
                  </div>
                </div>
              </CardBase>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-12 bg-peach md:bg-peach dark:bg-zinc-900">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4">
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

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
            {servicos && servicos.map((servico) => (
              <div key={servico.id} className="snap-start shrink-0 w-[48%] md:w-auto">
              <CardBase
                id={servico.id}
                titulo={servico.titulo}
                imagem={servico.imagem}
                link={`/servico/${servico.id}`}
                categoria={servico.categoria}
              >
                <div className="flex flex-col flex-grow">
                    <p className="text-sm text-zinc-900 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">{servico.descricao}</p>
                  <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm font-medium text-primary">{servico.prestador.nome}</p>
                  </div>
                </div>
              </CardBase>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu de Navegação */}
      <section className="py-12 bg-peach-100 md:bg-peach-100 dark:bg-black">
        <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/cinema" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Theater className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Cinema</span>
            </Link>
            <Link to="/eventos" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Calendar className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Eventos</span>
            </Link>
            <Link to="/novidades" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Newspaper className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Novidades</span>
            </Link>
            <Link to="/onde-ir" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <MapPin className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Onde Ir</span>
            </Link>
            <Link to="/classificados" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Tag className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Classificados</span>
            </Link>
            <Link to="/servicos" className="flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <Wrench className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Serviços</span>
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