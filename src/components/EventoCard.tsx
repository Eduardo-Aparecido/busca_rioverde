/**
 * Importação dos componentes base e ícones necessários
 * - CardBase: Componente base para todos os cards do sistema
 * - Badge: Componente para exibir tags e status
 * - Ícones: Calendar, Clock e MapPin do Lucide para data, hora e localização
 */
import { CardBase } from "@/components/ui/card-base";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatEventBadge } from "@/lib/utils/formatEventBadge";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Interface que define as propriedades necessárias para o card de evento
 * @property id - Identificador único do evento
 * @property titulo - Título do evento
 * @property imagem - URL da imagem de capa do evento
 * @property dataHora - Data e hora do evento
 * @property data - Data do evento
 * @property hora - Hora do evento
 * @property duracao - Duração do evento (opcional)
 * @property local - Nome do local onde o evento acontecerá
 */
interface EventoCardProps {
  id: string;
  titulo: string;
  imagem: string;
  dataHora?: string;
  data?: string;
  hora?: string;
  duracao?: number;
  local: string;
}

/**
 * Componente EventoCard
 * 
 * Exibe um card com informações resumidas de um evento
 * Usado na listagem de eventos e na página inicial
 * 
 * Características:
 * - Usa o CardBase para manter consistência visual
 * - Exibe data e hora com ícones
 * - Mostra localização com ícone de pin
 * - Badge de "Patrocinado" quando aplicável
 * - Efeito de hover no grupo
 * - Link para página de detalhes do evento
 * 
 * @example
 * <EventoCard
 *   id="1"
 *   titulo="Show de Rock"
 *   imagem="/shows/rock.jpg"
 *   dataHora="2024-05-15T20:00"
 *   duracao={2}
 *   local="Teatro Municipal"
 * />
 */
export function EventoCard({
  id,
  titulo,
  imagem,
  dataHora,
  data,
  hora,
  duracao,
  local
}: EventoCardProps) {
  // Se tiver data e hora separados, tenta converter para ISO string
  let dataHoraISO = dataHora;
  
  if (!dataHoraISO && data && hora) {
    try {
      const dataParsed = parse(data, "dd MMM yyyy", new Date(), { locale: ptBR });
      const [horaStr, minutoStr] = hora.split(':');
      
      if (dataParsed && !isNaN(dataParsed.getTime())) {
        dataParsed.setHours(parseInt(horaStr, 10), parseInt(minutoStr, 10));
        dataHoraISO = dataParsed.toISOString();
      }
    } catch (error) {
      console.error('Erro ao converter data e hora:', error);
    }
  }

  const badgeText = dataHoraISO ? formatEventBadge(dataHoraISO, duracao) : '';

  return (
    <Link 
      to={`/evento/${id}`}
      className="flex flex-col overflow-hidden rounded-lg bg-zinc-900"
    >
      {/* Head - Imagem */}
      <div className="h-40">
        <img
          src={imagem}
          alt={titulo}
          className="h-full w-full object-cover"
        />
      </div>
        
      {/* Body - Badge com data/hora */}
      <div className="bg-red-500 w-full">
        <p className="text-sm font-medium text-white px-3 py-1 text-center">{badgeText}</p>
      </div>

      {/* Content - Título */}
      <div className="flex-1 p-3">
        <h3 className="text-base font-medium text-white">{titulo}</h3>
      </div>

      {/* Footer - Local */}
      <div className="p-3 pt-0">
        <p className="text-sm text-red-500 uppercase">{local}</p>
      </div>
    </Link>
  );
} 