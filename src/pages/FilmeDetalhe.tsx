import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  Share2,
  ArrowLeft,
  Theater,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YouTubeTrailer } from "@/components/ui/youtube-trailer";
import { useCurtida } from "@/hooks/useCurtida";

interface Horario {
  dia: string;
  horarios: string[];
}

interface SalaHorario {
  sala: string;
  tipos: string[];
  horarios: string[];
}

interface CinemaHorario {
  nome: string;
  endereco: string;
  logo: string;
  salas: SalaHorario[];
}

interface Filme {
  id: string;
  titulo: string;
  imagem: string;
  data: string;
  classificacao: string;
  duracao: string;
  descricao: string;
  elenco: string;
  diretor: string;
  genero: string;
  videoId?: string;
  cinemas: CinemaHorario[];
}

// Dados simulados para desenvolvimento
const filmesCineflix = [
  {
    id: "1",
    titulo: "Spider-Man: Sem Volta para Casa",
    imagem: "spider-man.jpg",
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "2h 28min",
    descricao: `
      Peter Parker é desmascarado e não consegue mais separar sua vida normal 
      dos grandes riscos de ser um super-herói. Quando ele recorre ao Doutor 
      Estranho para ajudar, os riscos se tornam ainda mais perigosos, e o 
      forçam a descobrir o que realmente significa ser o Homem-Aranha.
    `,
    elenco: `
      Tom Holland, Zendaya, Benedict Cumberbatch, Jon Favreau, Jacob Batalon
    `,
    diretor: "Jon Watts",
    genero: "Ação, Aventura, Ficção Científica",
    videoId: "JfVOs4VSpmA",
    cinemas: [
      {
        nome: "CINEFLIX (Buriti Shopping)",
        endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
        logo: "/images/cineflix-logo.png",
        salas: [
          {
            sala: "Sala 1",
            tipos: ["DUB"],
            horarios: ["14:30", "17:45", "21:00"]
          }
        ]
      },
      {
        nome: "CINE A (Shopping Rio Verde)",
        endereco: "Shopping Rio Verde, Av. Presidente Vargas, 2121 - Jardim Presidente, Rio Verde - GO",
        logo: "/images/cinea-logo.png",
        salas: [
          {
            sala: "Sala VIP",
            tipos: ["DUB", "VIP"],
            horarios: ["17:00", "19:20", "21:40"]
          },
          {
            sala: "Sala IMAX",
            tipos: ["DUB", "TELA GIGANTE"],
            horarios: ["14:20", "16:40", "19:00", "21:20"]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    titulo: "Vingadores: Ultimato",
    imagem: "vingadores-ultimato.jpg",
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "3h 2min",
    descricao: `
      Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas 
      vivas, os heróis precisam lidar com a perda de amigos e entes queridos. 
      Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers 
      e Natasha Romanova lideram a resistência contra o titã louco.
    `,
    elenco: `
      Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, 
      Scarlett Johansson, Jeremy Renner
    `,
    diretor: "Anthony Russo, Joe Russo",
    genero: "Ação, Aventura, Ficção Científica",
    videoId: "TcMBFSGVi1c",
    cinemas: [
      {
        nome: "CINEFLIX (Buriti Shopping)",
        endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
        logo: "/images/cineflix-logo.png",
        salas: [
          {
            sala: "Sala 2",
            tipos: ["DUB", "3D"],
            horarios: ["15:30", "18:45", "22:00"]
          }
        ]
      }
    ]
  }
];

const filmesCineA = [
  {
    id: "3",
    titulo: "Interestelar",
    imagem: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    data: "Em cartaz",
    classificacao: "10+",
    duracao: "2h 49min",
    descricao: "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie.",
    elenco: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    diretor: "Christopher Nolan",
    genero: "Ficção Científica, Drama, Aventura",
    videoId: "zSWdZVtXT7E",
    cinemas: [
      {
        nome: "CINE A (Shopping Rio Verde)",
        endereco: "Shopping Rio Verde, Av. Presidente Vargas, 2121 - Jardim Presidente, Rio Verde - GO",
        logo: "/images/cinea-logo.png",
        salas: [
          {
            sala: "Sala VIP",
            tipos: ["DUB", "VIP"],
            horarios: ["14:00", "17:30", "21:15"]
          }
        ]
      }
    ]
  }
];

const todosFilmes = [...filmesCineflix, ...filmesCineA];

export default function FilmeDetalhe() {
  const { id } = useParams();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [diaAtual, setDiaAtual] = useState(new Date());
  
  const { curtido, contagemCurtidas, handleCurtir } = useCurtida({ 
    itemId: id || '', 
    tipo: 'filme' 
  });
  
  const diasDaSemana = Array.from({ length: 7 }, (_, i) => {
    const data = new Date();
    data.setDate(data.getDate() + i);
    return data;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filmeEncontrado = todosFilmes.find(f => f.id === id);
    
    if (filmeEncontrado) {
      setFilme(filmeEncontrado);
    }
    
    setTimeout(() => {
      setCarregando(false);
    }, 300);
  }, [id]);

  const formatarData = (data: Date) => {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase();
    return `${diaSemana}\n${dia}/${mes}`;
  };

  if (!filme && !carregando) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Filme não encontrado</h2>
        <p className="mb-8">O filme que você está procurando não existe ou foi removido.</p>
        <Link to="/cinema">
          <Button>Voltar para a lista de filmes</Button>
        </Link>
      </div>
    );
  }

  if (!filme) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <img
          src={filme.imagem}
          alt={filme.titulo}
          className="w-full h-[50vh] object-cover"
        />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">{filme.titulo}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {filme.classificacao}
              </Badge>
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {filme.duracao}
              </span>
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {filme.data}
              </span>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg whitespace-pre-line leading-relaxed">
                {filme.descricao}
              </p>
              
              <div>
                <h3 className="text-foreground font-semibold mb-1">Gênero</h3>
                <p>{filme.genero}</p>
              </div>
              
              <div>
                <h3 className="text-foreground font-semibold mb-1">Direção</h3>
                <p>{filme.diretor}</p>
              </div>
              
              <div>
                <h3 className="text-foreground font-semibold mb-1">Elenco</h3>
                <p>{filme.elenco}</p>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleCurtir} 
                className="w-full sm:w-auto"
              >
                <Heart className={`h-4 w-4 mr-2 ${curtido ? "fill-red-500 text-red-500" : ""}`} />
                {curtido ? "Favoritado" : "Favoritar"}
                {contagemCurtidas > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({contagemCurtidas})
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {filme.videoId && (
              <div className="rounded-lg overflow-hidden">
                <YouTubeTrailer
                  videoId={filme.videoId}
                  title={`Trailer - ${filme.titulo}`}
                  className="w-full aspect-video"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              🍿 Salas e horários
            </h2>
          </div>

          {filme.cinemas && filme.cinemas.length > 0 ? (
            <>
              <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                {diasDaSemana.map((data, index) => (
                  <Button
                    key={index}
                    variant={data.toDateString() === diaAtual.toDateString() ? "default" : "outline"}
                    className="min-w-[100px] flex flex-col py-6"
                    onClick={() => setDiaAtual(data)}
                  >
                    <span className="text-xs uppercase">
                      {data.toLocaleDateString('pt-BR', { weekday: 'short' })}
                    </span>
                    <span className="text-lg font-bold">
                      {data.getDate()}/{(data.getMonth() + 1).toString().padStart(2, '0')}
                    </span>
                  </Button>
                ))}
              </div>

              <div className="space-y-6">
                {filme.cinemas.map((cinema, cinemaIndex) => (
                  <div key={cinemaIndex} className="bg-card rounded-lg p-6 border border-border">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img src={cinema.logo} alt={cinema.nome} className="h-8" />
                        <h3 className="text-xl font-semibold">{cinema.nome}</h3>
                      </div>
                      <Button variant="outline" size="sm" className="text-primary border-primary">
                        <Info className="h-4 w-4 mr-2" />
                        Preços e Infos
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {cinema.salas.map((sala, salaIndex) => (
                        <div key={salaIndex}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-muted-foreground">{sala.sala}</span>
                            {sala.tipos.map((tipo, tipoIndex) => (
                              <Badge 
                                key={tipoIndex} 
                                variant="secondary" 
                                className={`
                                  ${tipo === 'DUB' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                                  ${tipo === 'VIP' ? 'bg-orange-500/10 text-orange-500' : ''}
                                  ${tipo === 'TELA GIGANTE' ? 'bg-orange-500/10 text-orange-500' : ''}
                                `}
                              >
                                {tipo}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {sala.horarios.map((horario, horarioIndex) => (
                              <Button 
                                key={horarioIndex} 
                                variant="outline" 
                                className="hover:bg-primary hover:text-white"
                              >
                                {horario}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-muted-foreground text-sm flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                Dica: você pode tocar nos horários para comprar ingressos.
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Não há sessões disponíveis para este filme no momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
