/**
 * Importação dos componentes e dependências necessárias
 * - Hooks do React e React Router
 * - motion: Biblioteca de animações Framer Motion
 * - Ícones do Lucide
 * - Componentes UI personalizados
 * - Hooks personalizados para curtidas
 */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Heart, 
  ArrowLeft,
  Star,
  Loader2,
  Wifi,
  Car,
  CreditCard,
  Music,
  Dog,
  Wind,
  Accessibility,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFuncionamento } from "@/components/ui/status-funcionamento";
import { Map } from "@/components/ui/map";
import { ImageModal } from "@/components/ui/image-modal";
import { useCurtida } from "@/hooks/useCurtida";

/**
 * Interface que define a estrutura de um horário de funcionamento
 * @property dia - Dia da semana
 * @property horarios - Array de horários de funcionamento
 */
interface Horario {
  dia: string;
  horarios: string[];
}

/**
 * Interface que define a estrutura completa de um local
 * @property id - Identificador único do local
 * @property nome - Nome do estabelecimento
 * @property descricao - Descrição detalhada
 * @property endereco - Endereço completo
 * @property telefone - Número de telefone
 * @property website - Site do estabelecimento
 * @property horariosFuncionamento - Array de horários por dia
 * @property ultimaAtualizacao - Data da última atualização
 * @property avaliacao - Nota média (0-5)
 * @property avaliacoes - Número total de avaliações
 * @property banner - URL da imagem de capa
 * @property logo - URL do logo do estabelecimento
 * @property galeria - Array de URLs das imagens da galeria
 * @property comodidades - Array de comodidades disponíveis
 * @property latitude - Latitude para o mapa
 * @property longitude - Longitude para o mapa
 */
interface Local {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  website: string;
  horariosFuncionamento: Horario[];
  ultimaAtualizacao: string;
  avaliacao: number;
  avaliacoes: number;
  banner: string;
  logo: string;
  galeria: string[];
  comodidades: string[];
  latitude: number;
  longitude: number;
}

/**
 * Dados simulados para desenvolvimento
 * Array de objetos contendo informações detalhadas sobre os locais
 */
const locais: Local[] = [
  {
    id: "1",
    nome: "Finnegans",
    descricao: `
      Experiências saborosas em self service por quilo Gastrobar Culinária variada Petiscos O hambúrguer que você vai amar Drinks exclusivos.
    `,
    endereco: "Rua Rafael Nascimento, 219 - Centro",
    telefone: "(64) 2142-6535",
    website: "finnegansmusicandbeer.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "14:00"] },
      { dia: "Terça", horarios: ["11:00", "14:00", "18:00", "00:00"] },
      { dia: "Quarta", horarios: ["18:00", "23:00"] },
      { dia: "Quinta", horarios: ["18:00", "00:00"] },
      { dia: "Sexta", horarios: ["18:00", "01:00"] },
      { dia: "Sábado", horarios: ["16:00", "01:00"] },
      { dia: "Domingo", horarios: ["16:00", "22:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T14:30:00",
    avaliacao: 4.5,
    avaliacoes: 128,
    banner: "/images/onde_ir/finnegans/finnegans_02.png",
    logo: "/images/onde_ir/finnegans/finnegans_logo.png",
    galeria: [
      "/images/onde_ir/finnegans/finnegans_02.png",
      "/images/onde_ir/finnegans/finnegans_07.png",
      "/images/onde_ir/finnegans/finnegans_04.png",
      "/images/onde_ir/finnegans/finnegans_05.png",
      "/images/onde_ir/finnegans/finnegans_06.png",
      "/images/onde_ir/finnegans/finnegans_08.png"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Estacionamento",
      "Aceita Cartão",
      "Música ao Vivo",
      "Pet Friendly"
    ],
    latitude: -17.79942422405687,
    longitude: -50.93200656856998
  },
  {
    id: "2",
    nome: "Restaurante Sabor & Arte",
    descricao: `
      Um restaurante sofisticado que oferece o melhor da gastronomia 
      contemporânea com ingredientes locais.
    `,
    endereco: "Av. Brasil, 456 - Centro",
    telefone: "(64) 98888-8888",
    website: "www.saborarte.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "15:00"] },
      { dia: "Terça", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Quarta", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Quinta", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Sexta", horarios: ["11:00", "15:00", "19:00", "00:00"] },
      { dia: "Sábado", horarios: ["11:00", "16:00", "19:00", "00:00"] },
      { dia: "Domingo", horarios: ["11:00", "16:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T12:00:00",
    avaliacao: 4.7,
    avaliacoes: 256,
    banner: "/images/onde_ir/sabor_arte/sabor_arte_banner.png",
    logo: "/images/onde_ir/sabor_arte/sabor_arte_logo.png",
    galeria: [
      "/images/onde_ir/sabor_arte/sabor_arte_01.png",
      "/images/onde_ir/sabor_arte/sabor_arte_02.png",
      "/images/onde_ir/sabor_arte/sabor_arte_03.png",
      "/images/onde_ir/sabor_arte/sabor_arte_04.png"
    ],
    comodidades: [
      "Ar Condicionado",
      "Estacionamento",
      "Aceita Cartão",
      "Acessibilidade",
      "Reservas"
    ],
    latitude: -16.686815,
    longitude: -49.264710
  }
];

/**
 * Configuração do ícone do marcador para o mapa Leaflet
 * Define o ícone padrão e suas propriedades de tamanho e posicionamento
 */
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

/**
 * Função utilitária para verificar se um local está aberto no momento
 * @param horarios - Array de horários de funcionamento
 * @returns boolean - True se o local estiver aberto, false caso contrário
 */
const estaAberto = (horarios: Horario[]): boolean => {
  const agora = new Date();
  const diaSemana = agora.getDay();
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();
  const horaAtualEmMinutos = horaAtual * 60 + minutoAtual;

  // Mapeamento de dia da semana para o formato do horário
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const diaHoje = diasSemana[diaSemana];

  // Encontra o horário de hoje
  const horarioHoje = horarios.find(h => h.dia === diaHoje);
  
  if (!horarioHoje || horarioHoje.horarios.length === 0) return false;

  // Verifica se o horário atual está dentro de algum período de funcionamento
  for (let i = 0; i < horarioHoje.horarios.length; i += 2) {
    const abertura = horarioHoje.horarios[i];
    const fechamento = horarioHoje.horarios[i + 1];

    if (!abertura || !fechamento) continue;

    const [horaAbertura, minutoAbertura = "0"] = abertura.split(":");
    const [horaFechamento, minutoFechamento = "0"] = fechamento.split(":");

    const aberturaEmMinutos = parseInt(horaAbertura) * 60 + parseInt(minutoAbertura);
    const fechamentoEmMinutos = parseInt(horaFechamento) * 60 + parseInt(minutoFechamento);

    // Se o fechamento for depois da meia-noite
    if (fechamentoEmMinutos < aberturaEmMinutos) {
      if (horaAtualEmMinutos >= aberturaEmMinutos || horaAtualEmMinutos <= fechamentoEmMinutos) {
        return true;
      }
    } else {
      if (horaAtualEmMinutos >= aberturaEmMinutos && horaAtualEmMinutos <= fechamentoEmMinutos) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Função utilitária para obter o ícone correspondente a uma comodidade
 * @param comodidade - Nome da comodidade
 * @returns ReactNode - Componente do ícone correspondente
 */
const getComodidadeIcon = (comodidade: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    "Wi-Fi Grátis": <Wifi className="h-4 w-4" />,
    "Estacionamento": <Car className="h-4 w-4" />,
    "Aceita Cartão": <CreditCard className="h-4 w-4" />,
    "Música ao Vivo": <Music className="h-4 w-4" />,
    "Pet Friendly": <Dog className="h-4 w-4" />,
    "Ar Condicionado": <Wind className="h-4 w-4" />,
    "Acessibilidade": <Accessibility className="h-4 w-4" />,
    "Reservas": <CalendarCheck className="h-4 w-4" />
  };

  return icons[comodidade] || null;
};

/**
 * Página LocalDetalhe
 * 
 * Página de detalhes de um local específico
 * Exibe informações completas e permite interação com o local
 * 
 * Características:
 * - Banner principal com imagem do local
 * - Informações básicas (endereço, telefone, website)
 * - Horários de funcionamento
 * - Galeria de imagens com modal
 * - Mapa com localização
 * - Lista de comodidades
 * - Sistema de curtidas
 * - Design responsivo
 * - Tema claro/escuro
 * 
 * Estados:
 * - carregando: Controla o estado de carregamento
 * - local: Dados do local atual
 * - modalAberto: Controla a exibição do modal da galeria
 * - imagemSelecionadaIndex: Índice da imagem selecionada
 * - imagemPrincipal: URL da imagem principal
 */
export default function LocalDetalhe() {
  // Obtém o ID do local da URL
  const { id } = useParams();

  // Estados para controle da página
  const [carregando, setCarregando] = useState(true);
  const [local, setLocal] = useState<Local | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemSelecionadaIndex, setImagemSelecionadaIndex] = useState(0);
  const [imagemPrincipal, setImagemPrincipal] = useState<string>("");
  
  // Hook para gerenciar curtidas
  const { curtido, contagemCurtidas, handleCurtir } = useCurtida({ 
    itemId: id || '', 
    tipo: 'local' 
  });
  
  /**
   * Efeito para carregar os dados do local
   * Simula uma chamada à API usando dados mockados
   */
  useEffect(() => {
    setTimeout(() => {
      const localEncontrado = locais.find(l => l.id === id);
      setLocal(localEncontrado || null);
      setCarregando(false);
    }, 500);
  }, [id]);

  /**
   * Abre o modal da galeria com a imagem selecionada
   * @param index - Índice da imagem selecionada
   */
  const abrirModal = (index: number) => {
    setImagemSelecionadaIndex(index);
    setModalAberto(true);
  };

  /**
   * Navega para a próxima imagem na galeria
   */
  const proximaImagem = () => {
    if (local && imagemSelecionadaIndex < local.galeria.length - 1) {
      setImagemSelecionadaIndex(prev => prev + 1);
    }
  };

  /**
   * Navega para a imagem anterior na galeria
   */
  const imagemAnterior = () => {
    if (imagemSelecionadaIndex > 0) {
      setImagemSelecionadaIndex(prev => prev - 1);
    }
  };

  // Retorna mensagem de carregamento
  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (!local) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Local não encontrado</h2>
        <p className="mb-8">O local que você está procurando não existe ou foi removido.</p>
        <Link to="/onde-ir">
          <Button>Explorar outros lugares</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-black">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        {/* Breadcrumb */}
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          <span>Onde Ir</span>
          <span className="mx-2">›</span>
          <span>{local.categoria}</span>
        </div>

        {/* 
          Banner Principal
          - Imagem de capa do local
          - Altura responsiva
          - Cantos arredondados
        */}
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-b-2xl overflow-hidden mb-6 md:mb-8">
          <img
            src={local.banner}
            alt={local.nome}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 
          Informações Básicas
          - Nome e logo
          - Endereço
          - Telefone
          - Website
        */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 bg-zinc-200 dark:bg-zinc-900 p-3 md:p-4 rounded-lg">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={local.logo}
              alt={`Logo ${local.nome}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white truncate">{local.nome}</h1>
            <p className="text-cyan-600 dark:text-cyan-400 text-sm md:text-base truncate">{local.endereco}</p>
          </div>
        </div>
        
        {/* 
          Status e Avaliação
          - Status de funcionamento
          - Nota média
          - Número de avaliações
        */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-6 md:mb-8">
          <Badge 
            variant="secondary" 
            className={`text-sm md:text-lg font-semibold px-3 py-1 md:px-6 md:py-2 w-fit hover:bg-opacity-100 ${
              estaAberto(local.horariosFuncionamento) 
                ? 'bg-green-500 text-black' 
                : 'bg-yellow-500 text-black'
            }`}
          >
            {estaAberto(local.horariosFuncionamento) ? 'ABERTO AGORA' : 'FECHADO AGORA'}
          </Badge>
          <span className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm">
            Atualizado em {new Date(local.ultimaAtualizacao).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
            </div>

        {/* 
          Descrição
          - Texto formatado
          - Estilo responsivo
        */}
        <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg p-3 md:p-4 mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-zinc-900 dark:text-zinc-400" />
            <span className="text-black dark:text-white text-sm md:text-base">Horários de funcionamento</span>
                  </div>
          <div className="space-y-1 text-xs md:text-sm text-zinc-900 dark:text-zinc-300">
            {local.horariosFuncionamento.map((horario, index) => (
              horario.horarios.length > 0 && (
                <div key={index}>
                  <span className="font-medium">{horario.dia}:</span>{" "}
                  <span>{horario.horarios.join(" às ")}</span>
                </div>
              )
            ))}
                </div>
              </div>

        {/* 
          Comodidades
          - Lista de comodidades disponíveis
          - Ícones representativos
        */}
        <div className="flex flex-wrap gap-2 mb-8">
          {local.comodidades.map((comodidade, index) => (
            <div 
              key={index}
              className="bg-zinc-200 dark:bg-zinc-900 px-3 py-2 rounded-lg text-xs md:text-sm text-zinc-900 dark:text-zinc-300 flex items-center gap-2"
            >
              {getComodidadeIcon(comodidade)}
              <span>{comodidade}</span>
            </div>
          ))}
        </div>

        {/* 
          Descrição
          - Texto formatado
          - Estilo responsivo
        */}
        <div className="mb-12 text-zinc-900 dark:text-zinc-300 space-y-4">
          <p className="whitespace-pre-line">{local.descricao}</p>
          <p>
            Os pedidos de garrafas, growlers e latas podem ser feitos pelo{" "}
            <a 
              href={`https://wa.me/${local.telefone.replace(/\D/g, '')}`}
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {local.telefone}
            </a>
          </p>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

        {/* 
          Galeria
          - Grid responsivo de imagens
          - Modal para visualização
          - Efeito hover nas imagens
        */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-6">Eventos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {local.galeria.map((imagem, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => abrirModal(index)}
              >
                <img
                  src={imagem}
                  alt={`${local.nome} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 
          Mapa
          - Localização do estabelecimento
          - Marcador personalizado
        */}
        <div className="mb-24">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Localização</h2>
          <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg p-3 md:p-4">
            <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
              <Map 
                latitude={local.latitude}
                longitude={local.longitude}
                title={local.nome}
                description={local.endereco}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de imagem */}
      <ImageModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        imageUrl={local.galeria[imagemSelecionadaIndex]}
        alt={`${local.nome} - Imagem ${imagemSelecionadaIndex + 1}`}
        onNext={proximaImagem}
        onPrevious={imagemAnterior}
        hasNext={imagemSelecionadaIndex < local.galeria.length - 1}
        hasPrevious={imagemSelecionadaIndex > 0}
      />
    </div>
  );
}