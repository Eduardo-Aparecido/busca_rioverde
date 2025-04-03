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
 * @property categoria - Categoria do evento (opcional)
 * @property patrocinado - Indica se o evento é patrocinado (opcional)
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
  categoria?: string;
  patrocinado?: boolean;
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
  local,
  categoria,
  patrocinado
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
    <Link to={`/evento/${id}`}>
      <div className="group bg-white dark:bg-black rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 transition-colors">
        {/* Imagem do Evento */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Badge de categoria no topo */}
          {categoria && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-white/90 text-black text-xs">
                {categoria}
              </Badge>
            </div>
          )}
        </div>

        {/* Badge com data/hora */}
        <div className="bg-red-500 w-full">
          <p className="text-xs font-medium text-white px-3 py-1 text-center">{badgeText}</p>
        </div>

        {/* Informações do Evento */}
        <div className="p-4 flex flex-col h-[120px]">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-2">
            {titulo}
          </h3>
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{local}</span>
            </div>
            {patrocinado && (
              <Badge className="bg-yellow-500/90 text-white border-0 text-[10px] px-2 py-0.5 w-fit">
                Patrocinado
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 