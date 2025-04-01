/**
 * Importação dos componentes e dependências necessárias
 * - Hooks do React e React Router
 * - motion: Biblioteca de animações Framer Motion
 * - Ícones do Lucide
 * - Componentes UI personalizados
 * - Hooks personalizados para curtidas
 */
import { useEffect, useState } from "react";
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
  CalendarCheck,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFuncionamento } from "@/components/ui/status-funcionamento";
import { Map } from "@/components/ui/map";
import { ImageGallery } from "@/components/ui/image-gallery";
import { useCurtida } from "@/hooks/useCurtida";
import { Local, locais } from "@/data/locais";

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
    "Wi-Fi Grátis": <Wifi className="h-4 w-4 text-white" />,
    "Estacionamento": <Car className="h-4 w-4 text-white" />,
    "Aceita Cartão": <CreditCard className="h-4 w-4 text-white" />,
    "Música ao Vivo": <Music className="h-4 w-4 text-white" />,
    "Pet Friendly": <Dog className="h-4 w-4 text-white" />,
    "Ar Condicionado": <Wind className="h-4 w-4 text-white" />,
    "Acessibilidade": <Accessibility className="h-4 w-4 text-white" />,
    "Reservas": <CalendarCheck className="h-4 w-4 text-white" />
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
  const { id } = useParams();
  const local = locais.find((l) => l.id === id);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!local) {
    return <div>Local não encontrado</div>;
  }

  const abrirModal = (index: number) => {
    setImagemSelecionada(index);
    setModalAberto(true);
  };

  const estaAberto = () => {
    const agora = new Date();
    const diaSemana = agora.getDay();
    const horaAtual = agora.getHours() * 100 + agora.getMinutes();

    const horarioHoje = local.horariosFuncionamento[diaSemana];
    if (!horarioHoje || !horarioHoje.horarios.length) return false;

    return horarioHoje.horarios.some(horario => {
      const [inicio, fim] = horario.split(" às ").map(h => {
        const [hora, minuto] = h.split(":").map(Number);
        return hora * 100 + (minuto || 0);
      });
      return horaAtual >= inicio && horaAtual <= fim;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="w-[115%] sm:w-[105%] md:w-[95%] lg:w-[85%] xl:w-[75%] mx-auto px-4 py-8">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden">
          {/* Banner */}
          <div className="w-full h-[400px] overflow-hidden">
            <img
              src={local.banner}
              alt={local.nome}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badges */}
          <div className="flex justify-between items-center px-4 py-2">
            <div>
              {estaAberto() ? (
                <Badge className="bg-emerald-500 hover:bg-emerald-500">
                  ABERTO AGORA
                </Badge>
              ) : (
                <Badge className="bg-yellow-400 hover:bg-yellow-400 text-black">
                  FECHADO AGORA
                </Badge>
              )}
            </div>
            <Badge className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              Atualizado em {new Date(local.ultimaAtualizacao).toLocaleString('pt-BR', { 
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Badge>
          </div>

          <div className="p-6">
            {/* Informações Principais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                {/* Cabeçalho */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{local.nome}</h1>
                </div>

                {/* Descrição */}
                <div className="mt-6">
                  <p className="text-zinc-800 dark:text-zinc-300 whitespace-pre-line">{local.descricao}</p>
                </div>

                {/* Horários */}
                <div className="mt-8">
                  <div className="bg-zinc-900 dark:bg-zinc-800 rounded-lg p-4 max-w-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-white" />
                      <h2 className="text-lg font-semibold text-white">Horários de funcionamento</h2>
                    </div>
                    <div className="space-y-2">
                      {local.horariosFuncionamento.map((horario, index) => (
                        horario.horarios.length > 0 && (
                          <div key={index} className="text-zinc-300">
                            <span>{horario.dia}: </span>
                            <span>das {horario.horarios.join(" às ")}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comodidades */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {local.comodidades.map((comodidade, index) => (
                    <div 
                      key={index}
                      className="bg-zinc-900 dark:bg-zinc-800 px-3 py-2 rounded-lg text-sm text-white flex items-center gap-2"
                    >
                      {getComodidadeIcon(comodidade)}
                      <span>{comodidade}</span>
                    </div>
                  ))}
                </div>

                {/* Divisor */}
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800" />

                {/* Galeria */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Galeria</h2>
                  <ImageGallery images={local.galeria} />
                </div>

                {/* Links */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href={`https://${local.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <span>Link do local</span>
                  </a>
                  <a 
                    href={`https://wa.me/${local.telefone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{local.telefone}</span>
                  </a>
                </div>

                {/* Localização */}
                <div className="mt-8">
                  <div className="w-full h-[400px] rounded-lg overflow-hidden">
                    <Map 
                      latitude={local.latitude}
                      longitude={local.longitude}
                      title={local.nome}
                      description={local.endereco}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}