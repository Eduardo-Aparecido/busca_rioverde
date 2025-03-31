/**
 * Importação dos componentes base e ícones necessários
 * - CardBase: Componente base para todos os cards do sistema
 * - Badge: Componente para exibir tags e status
 * - Ícones: Calendar, Clock e MapPin do Lucide para data, hora e localização
 */
import { CardBase } from "@/components/ui/card-base";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

/**
 * Interface que define as propriedades necessárias para o card de evento
 * @property id - Identificador único do evento
 * @property titulo - Título do evento
 * @property imagem - URL da imagem de capa do evento
 * @property data - Data do evento (formato: DD/MM/YYYY)
 * @property hora - Horário do evento (formato: HH:mm)
 * @property local - Nome do local onde o evento acontecerá
 * @property categoria - Categoria do evento (ex: "Show", "Teatro", etc)
 * @property patrocinado - Indica se o evento é patrocinado (opcional)
 */
interface EventoCardProps {
  id: string;
  titulo: string;
  imagem: string;
  data: string;
  hora: string;
  local: string;
  categoria: string;
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
 *   data="01/04/2024"
 *   hora="20:00"
 *   local="Teatro Municipal"
 *   categoria="Show"
 *   patrocinado={true}
 * />
 */
export function EventoCard({
  id,
  titulo,
  imagem,
  data,
  hora,
  local,
  categoria,
  patrocinado = false
}: EventoCardProps) {
  const detailsLink = `/evento/${id}`;
  
  return (
    <CardBase 
      link={detailsLink}
      id={id}
      titulo={titulo}
      imagem={imagem}
      categoria={categoria}
      patrocinado={patrocinado}
    >
      <div className="space-y-2">
        {/* Data e Hora do Evento */}
        <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
          <Calendar className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <span className="text-xs">{data}</span>
          <span className="mx-2 text-zinc-300 dark:text-zinc-600">•</span>
          <Clock className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <span className="text-xs">{hora}</span>
        </div>

        {/* Local do Evento */}
        <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
          <MapPin className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <span className="text-xs line-clamp-1">{local}</span>
        </div>
      </div>
    </CardBase>
  );
} 