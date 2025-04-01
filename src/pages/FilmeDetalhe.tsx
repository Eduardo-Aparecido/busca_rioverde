/**
 * Importação dos componentes e dependências necessárias
 * - Hooks do React e React Router
 * - motion: Biblioteca de animações Framer Motion
 * - Ícones do Lucide
 * - Componentes UI personalizados
 * - Hooks personalizados para curtidas e compartilhamento
 */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Theater,
  Info,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YouTubeTrailer } from "@/components/ui/youtube-trailer";
import { ImageGallery } from "@/components/ui/image-gallery";

/**
 * Interface para horários simples
 * @property dia - Data do horário
 * @property horarios - Lista de horários disponíveis
 */
interface Horario {
  dia: string;
  horarios: string[];
}

/**
 * Interface para horários de uma sala específica
 * @property sala - Número ou nome da sala
 * @property tipos - Tipos de exibição (2D, 3D, DUB, LEG)
 * @property horarios - Lista de horários disponíveis
 */
interface SalaHorario {
  sala: string;
  tipos: string[];
  horarios: string[];
}

/**
 * Interface para informações de um cinema
 * @property nome - Nome do cinema
 * @property endereco - Endereço completo
 * @property logo - URL do logotipo
 * @property salas - Lista de salas e seus horários
 */
interface CinemaHorario {
  nome: string;
  endereco: string;
  logo: string;
  salas: SalaHorario[];
}

/**
 * Interface para datas disponíveis
 * @property dia - Data no formato DD/MM
 * @property diaSemana - Dia da semana abreviado
 * @property cinemas - Lista de cinemas com horários
 */
interface DataDisponivel {
  dia: string;
  diaSemana: string;
  cinemas: CinemaHorario[];
}

/**
 * Interface para informações completas do filme
 * @property id - Identificador único do filme
 * @property titulo - Nome do filme
 * @property imagem - URL do poster
 * @property data - Data de estreia
 * @property classificacao - Classificação indicativa
 * @property duracao - Duração do filme
 * @property descricao - Sinopse do filme
 * @property elenco - Lista de atores principais
 * @property diretor - Nome do diretor
 * @property genero - Gêneros do filme
 * @property videoId - ID do trailer no YouTube (opcional)
 * @property linkVenda - URL para compra de ingressos
 * @property datasDisponiveis - Lista de datas e horários disponíveis
 */
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
  linkVenda: string;
  datasDisponiveis: DataDisponivel[];
}

/**
 * Configuração dos cinemas e suas salas por filme
 */
const CINEMAS = {
  CINEFLIX: {
    nome: "CINEFLIX",
    endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
    logo: "/images/cinemas/cineflix/logo/logo_02.png",
    filmes: {
      "1": { // Minecraft
        salas: {
          sala1: {
            nome: "Sala 1",
                tipos: ["DUB", "3D"],
            horarios: {
              segunda: ["14:30", "16:50", "00:00"],
              terca: ["14:30", "16:50"],
              quarta: ["14:30", "16:50"],
              quinta: ["14:30", "16:50"],
              sexta: ["14:30", "16:50"],
              sabado: ["14:30", "16:50"],
              domingo: ["14:30", "23:50"]
            }
          }
        }
      },
      "2": { // Branca de Neve
        salas: {
          sala2: {
            nome: "Sala 2",
                tipos: ["DUB", "2D"],
            horarios: {
              segunda: ["16:20", "18:40", "21:00"],
              terca: ["16:20", "18:40"],
              quarta: ["16:20", "18:40", "21:00"],
              quinta: ["16:20", "18:40", "21:00"],
              sexta: ["16:20", "18:40", "21:00"],
              sabado: ["16:20", "18:40", "21:00"],
              domingo: ["16:20", "18:40", "21:00"]
            }
          },
          sala3: {
            nome: "Sala 3",
                tipos: ["LEG", "2D"],
            horarios: {
              segunda: ["15:00", "19:30"],
              terca: ["15:00", "19:30"],
              quarta: ["15:00", "19:30"],
              quinta: ["15:00", "19:30"],
              sexta: ["15:00", "19:30"],
              sabado: ["15:00", "19:30"],
              domingo: ["15:00", "19:30"]
            }
          }
        }
      },
      "3": { // Vitória
        salas: {
          sala4: {
            nome: "Sala 4",
            tipos: ["DUB", "2D"],
            horarios: {
              segunda: ["16:10", "18:40", "21:10"],
              terca: ["16:10", "18:40", "21:10"],
              quarta: ["16:10", "18:40", "21:10"],
              quinta: ["16:10", "18:40", "21:10"],
              sexta: ["16:10", "18:40", "21:10"],
              sabado: ["16:10", "18:40", "21:10"],
              domingo: ["16:10", "18:40", "21:10"]
            }
          }
        }
      }
    }
  },
  CINEA: {
    nome: "CINE A",
    endereco: "Shopping Rio Verde",
    logo: "/images/cinea-logo.png",
    filmes: {
      "3": { // Vitória
        salas: {
          salaVIP: {
            nome: "Sala VIP",
            tipos: ["DUB", "VIP"],
            horarios: {
              segunda: ["14:00", "17:30", "21:15"],
              terca: ["14:00", "17:30", "21:15"],
              quarta: ["14:00", "17:30", "21:15"],
              quinta: ["14:00", "17:30", "21:15"],
              sexta: ["14:00", "17:30", "21:15"],
              sabado: ["14:00", "17:30", "21:15"],
              domingo: ["14:00", "17:30", "21:15"]
            }
          }
        }
      }
    }
  }
};

// Interfaces para a estrutura de salas e horários
interface SalaConfig {
  nome: string;
  tipos: string[];
  horarios: {
    [key: string]: string[];
  };
}

interface FilmeConfig {
  salas: {
    [key: string]: SalaConfig;
  };
}

interface CinemaConfig {
  nome: string;
  endereco: string;
  logo: string;
  filmes: {
    [key: string]: FilmeConfig;
  };
}

interface CinemasConfig {
  CINEFLIX: CinemaConfig;
  CINEA: CinemaConfig;
}

/**
 * Função para obter os horários da sala baseado no dia da semana
 */
function getHorariosSala(cinema: string, filmeId: string, nomeSala: string, data: Date): string[] {
  const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  const diaSemana = diasSemana[data.getDay()];
  
  const cinemaConfig = CINEMAS[cinema as keyof typeof CINEMAS];
  if (!cinemaConfig?.filmes?.[filmeId]?.salas) return [];

  const sala = Object.values(cinemaConfig.filmes[filmeId].salas).find(s => s.nome === nomeSala);
  if (!sala?.horarios?.[diaSemana]) return [];
  
  return sala.horarios[diaSemana];
}

/**
 * Função para gerar datas dinâmicas
 */
function gerarDatasDisponiveis(filmeId: string): DataDisponivel[] {
  const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  const hoje = new Date();
  
  return Array.from({ length: 7 }).map((_, index) => {
    const data = new Date();
    data.setDate(hoje.getDate() + index);
    
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const diaSemana = diasSemana[data.getDay()];
    
    let textoSemana = diaSemana;
    if (index === 0) textoSemana = "HOJE";
    else if (index === 1) textoSemana = "AMANHÃ";

    const cinemas = [];

    // Verifica horários do CINEFLIX
    if (CINEMAS.CINEFLIX.filmes[filmeId]?.salas) {
      const salasCineflix = Object.values(CINEMAS.CINEFLIX.filmes[filmeId].salas)
        .map(sala => ({
          sala: sala.nome,
          tipos: sala.tipos,
          horarios: getHorariosSala("CINEFLIX", filmeId, sala.nome, data)
        }))
        .filter(sala => sala.horarios.length > 0);

      if (salasCineflix.length > 0) {
        cinemas.push({
          nome: CINEMAS.CINEFLIX.nome,
          endereco: CINEMAS.CINEFLIX.endereco,
          logo: CINEMAS.CINEFLIX.logo,
          salas: salasCineflix
        });
      }
    }

    // Verifica horários do CINE A
    if (CINEMAS.CINEA.filmes[filmeId]?.salas) {
      const salasCinea = Object.values(CINEMAS.CINEA.filmes[filmeId].salas)
        .map(sala => ({
          sala: sala.nome,
          tipos: sala.tipos,
          horarios: getHorariosSala("CINEA", filmeId, sala.nome, data)
        }))
        .filter(sala => sala.horarios.length > 0);

      if (salasCinea.length > 0) {
        cinemas.push({
          nome: CINEMAS.CINEA.nome,
          endereco: CINEMAS.CINEA.endereco,
          logo: CINEMAS.CINEA.logo,
          salas: salasCinea
        });
      }
    }

    return {
      dia: `${dia}/${mes}`,
      diaSemana: textoSemana,
      cinemas: cinemas
    };
  }).filter(data => data.cinemas.length > 0);
}

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */
const filmesCineflix = [
  {
    id: "1",
    titulo: "Um Filme Minecraft",
    imagem: "/images/cinemas/cineflix/minecraft.png",
    data: "03 Abr 2025",
    classificacao: "Livre",
    duracao: "1h 41min",
    descricao: `
      Quatro desajustados — Garrett "The Garbage Man" Garrison, Henry, Natalie e Dawn — são misteriosamente transportados para o Overworld, um mundo cúbico onde a criatividade é essencial para a sobrevivência. Nesse ambiente repleto de perigos como Piglins e Zumbis, eles devem aprender a dominar suas habilidades criativas para encontrar um caminho de volta para casa, 
      enquanto enfrentam ameaças que podem destruir tanto o Overworld quanto o mundo real.

    `,
    elenco: `
      Jack Black, Jason Momoa, Danielle Brooks
    `,
    diretor: "Jared Hess",
    genero: "Aventura, Comédia,",
    videoId: "SZMub74Xd-Q",
    linkVenda: "https://vendaonline.cineflix.com.br/sessions/minecraft/RVD/",
    datasDisponiveis: [] // Será preenchido dinamicamente
  },
  {
    id: "2",
    titulo: "Branca de Neve",
    imagem: "/images/cinemas/cineflix/brancadeneve.png",
    data: "Em cartaz",
    classificacao: "12+",
    duracao: "3h 2min",
    descricao: `
      Inspirado no conto clássico dos Irmãos Grimm, Branca de Neve ganha uma 
      nova adaptação live-action da Disney. 

      A história acompanha a jovem princesa Branca de Neve (Rachel Zegler), cuja beleza desperta a inveja de sua madrasta, a Rainha Má (Gal Gadot). 
      Determinada a eliminar a enteada, a vilã ordena sua morte, mas Branca de Neve consegue escapar e 
      se refugia na floresta. Lá, encontra uma cabana onde vivem sete anões amigáveis, 
      que a acolhem e se tornam seus aliados. No entanto, o perigo ainda ronda a princesa, 
      pois a Rainha Má tem um plano cruel para eliminá-la de vez: uma maçã envenenada. 
      Além de recontar a icônica jornada da princesa, o filme traz uma abordagem renovada 
      com novas canções originais compostas por Benj Pasek e Justin Paul, responsáveis pelas 
      trilhas de La La Land e O Rei do Show.
    `,
    elenco: `
       Rachel Zegler, Gal Gadot, Andrew Burnap
    `,
    diretor: " Marc Webb | Roteiro Erin Cressida Wilson",
    genero: "Aventura, Fantasia, Comédia Musical",
    videoId: "X3o9GyKda1k",
    linkVenda: "https://vendaonline.cineflix.com.br/sessions/branca-de-neve/RVD/",
    datasDisponiveis: [
      {
        dia: "27/03",
        diaSemana: "QUI",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              },
              {
                sala: "Sala 2",
                tipos: ["DUB", "2D"],
                horarios: ["16:20", "18:40", "19:10", "21:00"]
              }
            ]
          }
        ]
      },
      {
        dia: "28/03",
        diaSemana: "SEX",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [
              {
                sala: "Sala 5",
                tipos: ["DUB", "2D"],
                horarios: ["14:00"]
              },
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              },
              {
                sala: "Sala 2",
                tipos: ["DUB", "2D"],
                horarios: ["16:20", "18:40", "21:00"]
              },
              {
                sala: "Sala 3",
                tipos: ["DUB", "2D"],
                horarios: ["15:00"]
              }
            ]
          }
        ]
      },
      {
        dia: "29/03",
        diaSemana: "SAB",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [
              {
                sala: "Sala 5",
                tipos: ["DUB", "2D"],
                horarios: ["14:00"]
              },
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              },
              {
                sala: "Sala 2",
                tipos: ["DUB", "2D"],
                horarios: ["16:20", "18:40", "21:00"]
              },
              {
                sala: "Sala 3",
                tipos: ["DUB", "2D"],
                horarios: ["15:00"]
              }
            ]
          }
        ]
      },
      {
        dia: "30/03",
        diaSemana: "DOM",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [
              {
                sala: "Sala 5",
                tipos: ["DUB", "2D"],
                horarios: ["14:00"]
              },
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              },
              {
                sala: "Sala 2",
                tipos: ["DUB", "2D"],
                horarios: ["16:20", "18:40", "21:00"]
              },
              {
                sala: "Sala 3",
                tipos: ["DUB", "2D"],
                horarios: ["15:00"]
              }
            ]
          }
        ]
      },
      {
        dia: "31/03",
        diaSemana: "SEG",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [              
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              },
              {
                sala: "Sala 2",
                tipos: ["DUB", "2D"],
                horarios: ["16:20", "18:40", "21:00"]
              }
            ]
          }
        ]
      },
      {
        dia: "01/04",
        diaSemana: "TER",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [              
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              },
              {
                sala: "Sala 2",
                tipos: ["DUB", "2D"],
                horarios: ["16:20", "18:40", "21:00"]
              }
            ]
          }
        ]
      },
      {
        dia: "02/04",
        diaSemana: "QUA",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [              
              {
                sala: "Sala 1",
                tipos: ["DUB", "2D"],
                horarios: ["14:30", "16:50", "19:10"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "3",
    titulo: "Vitória",
    imagem: "/images/cinemas/cineflix/vitoria.png",
    data: "Em cartaz",
    classificacao: "16+",
    duracao: "1h 52min",
    descricao: `
      A história real de uma aposentada que desmontou uma quadrilha carioca de traficantes e policiais a partir de filmagens feitas da janela do seu apartamento no Rio de Janeiro.

    `,
    elenco: `
        Fernanda Montenegro, Silvio Guindane, Jeniffer Dias
    `,
    diretor: "Andrucha Waddington |  Paula Fiuza, Breno Silveira",
    genero: " Policial, Drama",
    videoId: "3Zr6YJ02r5g",
    linkVenda: "https://vendaonline.cineflix.com.br/sessions/vitoria/RVD/",
    datasDisponiveis: [
      {
        dia: "25/03",
        diaSemana: "TER",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [
              {
                sala: "Sala 4",
                tipos: ["DUB", "2D"],
                horarios: ["16:10", "18:40", "21:10"]
              }
            ]
          }
        ]
      },
      {
        dia: "26/03",
        diaSemana: "QUA",
        cinemas: [
          {
            nome: "CINEFLIX",
            endereco: "Av. Rio Verde, 1003 - Buritis II, Rio Verde - GO",
            logo: "/images/cinemas/cineflix/logo/logo_02.png",
            salas: [
              {
                sala: "Sala 4",
                tipos: ["DUB", "2D"],
                horarios: ["16:10", "18:40", "21:10"]
              }
            ]
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
    linkVenda: "https://vendaonline.cineflix.com.br/sessions/interestelar/RVD/",
    datasDisponiveis: [
      {
        dia: "25/03",
        diaSemana: "SEG",
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
    ]
  }
];

const todosFilmes = [...filmesCineflix, ...filmesCineA];

/**
 * Página FilmeDetalhe
 * 
 * Página de detalhes de um filme em cartaz
 * Exibe informações completas e permite compra de ingressos
 * 
 * Características:
 * - Hero section com poster e informações principais
 * - Trailer do filme (quando disponível)
 * - Sinopse e informações técnicas
 * - Seleção de data e horário
 * - Compra de ingressos por cinema
 * - Botões de curtir e compartilhar
 * - Design responsivo
 * 
 * Estados:
 * - dataAtiva: Data selecionada para exibição dos horários
 * - curtido: Estado de curtida do filme
 * - filme: Dados do filme atual
 */
export default function FilmeDetalhe() {
  const { id } = useParams();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [dataAtiva, setDataAtiva] = useState<string>("");
  const [modalPrecos, setModalPrecos] = useState(false);
  
  useEffect(() => {
    if (!id) return;

    // Procura o filme em todos os cinemas
    const filmeEncontrado = {...todosFilmes.find(f => f.id === id)};
    if (filmeEncontrado) {
      // Determina de qual cinema é o filme
      const isCineflix = filmesCineflix.some(f => f.id === id);
      // Gera datas dinâmicas para o cinema correto
      const datas = gerarDatasDisponiveis(id);
      filmeEncontrado.datasDisponiveis = datas;
      setFilme(filmeEncontrado);
      if (datas.length > 0) {
        setDataAtiva(datas[0].dia);
      }
    }
  }, [id]);

  if (!filme) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-zinc-900">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto py-8">
        <div className="bg-white dark:bg-black rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* Hero Image */}
          <div className="w-full h-[400px] overflow-hidden bg-zinc-900">
            <img
              src={filme.imagem}
              alt={filme.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-6">{filme.titulo}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {filme.genero.split(",").map((genero, index) => (
                <span key={index} className="text-cyan-600 dark:text-cyan-500">
                  {genero.trim()}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6">
              {filme.videoId && (
                <div className="aspect-video w-full">
                  <YouTubeTrailer 
                    videoId={filme.videoId} 
                    title={filme.titulo}
                  />
                </div>
              )}

              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 space-y-4">
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">Classificação:</div>
                  <div className="text-zinc-900 dark:text-white">{filme.classificacao}</div>
                </div>
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">Duração:</div>
                  <div className="text-zinc-900 dark:text-white">{filme.duracao}</div>
                </div>
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">Direção:</div>
                  <div className="text-zinc-900 dark:text-white">{filme.diretor}</div>
                </div>
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">No elenco:</div>
                  <div className="text-zinc-900 dark:text-white">{filme.elenco}</div>
                </div>
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">Ano:</div>
                  <div className="text-zinc-900 dark:text-white">2025</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-zinc-800 dark:text-zinc-300 leading-relaxed">
              {filme.descricao}
            </div>

            {/* Horários */}
            <div className="mt-8 sm:mt-12 pb-8 sm:pb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🍿</span>
                <h2 className="text-xl sm:text-2xl font-medium text-zinc-900 dark:text-white">Salas e horários</h2>
              </div>
              
              {/* Datas */}
              <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0">
                <div className="flex gap-3 px-4 sm:px-0 min-w-full sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {filme.datasDisponiveis.map((data) => (
                    <Button
                      key={data.dia}
                      variant="outline"
                      className={`
                        flex-shrink-0 w-[120px] sm:w-full h-[64px] sm:h-[52px] rounded-full border-2 flex flex-col items-center justify-center p-0
                        ${dataAtiva === data.dia 
                          ? "bg-cyan-500 text-black border-cyan-500" 
                          : "border-cyan-500 text-zinc-900 dark:text-white hover:bg-cyan-500/20"
                        }
                      `}
                      onClick={() => setDataAtiva(data.dia)}
                    >
                      <div className="text-xs leading-none">{data.diaSemana}</div>
                      <div className="text-sm font-medium mt-1">{data.dia}</div>
                    </Button>
                  ))}
                </div>
              </div>
                    
              {/* Lista de Cinemas */}
              <div className="space-y-4 sm:space-y-6">
                {filme.datasDisponiveis
                  .find(data => data.dia === dataAtiva)
                  ?.cinemas.map((cinema) => (
                    <div 
                      key={cinema.nome}
                      className="bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
                    >
                      {/* Header do Cinema */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 gap-2">
                        <div className="flex items-center gap-4">
                          <img 
                            src={cinema.logo} 
                            alt={cinema.nome}
                            className="h-6 sm:h-8 w-auto"
                          />
                          <h3 className="text-zinc-900 dark:text-white font-medium">{cinema.nome}</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/20 h-6 text-[10px] sm:text-sm sm:h-9 px-1.5 sm:px-3 whitespace-nowrap"
                          asChild
                        >
                          <Link 
                            to={filme.linkVenda}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            PREÇOS E INFOS
                          </Link>
                        </Button>
                      </div>

                      {/* Lista de Salas */}
                      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {cinema.salas.map((sala, index) => (
                          <div key={`${sala.sala}-${index}`} className="p-4 space-y-3 sm:space-y-4">
                            {/* Tipos de exibição */}
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="text-zinc-900 dark:text-white font-medium">{sala.sala}</span>
                              <span className="text-zinc-500 dark:text-zinc-400">•</span>
                              {sala.tipos.map((tipo, idx) => {
                                let bgColor = "bg-green-700";
                                if (tipo === "LEG") {
                                  bgColor = "bg-red-700";
                                } else if (tipo.includes("3D") || tipo.includes("2D")) {
                                  bgColor = "bg-orange-500";
                                }
                                return (
                                  <Badge 
                                    key={idx}
                                    className={`${bgColor} text-white border-none px-2 sm:px-3 py-1 text-xs sm:text-sm`}
                                  >
                                    {tipo}
                                  </Badge>
                                );
                              })}
                            </div>
                            {/* Horários */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {sala.horarios.map((horario, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-cyan-500/20 border-cyan-500 text-sm sm:text-base h-9 sm:h-10"
                                  asChild
                                >
                                  <Link 
                                    to={filme.linkVenda}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {horario}
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                <span className="text-yellow-500">⭐</span>
                <span>Dica: você pode tocar nos horários para comprar ingressos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
