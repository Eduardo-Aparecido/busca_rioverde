import { CardBase } from "@/components/ui/card-base";
import { Calendar, Clock, MapPin } from "lucide-react";

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
  return (
    <CardBase
      id={id}
      titulo={titulo}
      imagem={imagem}
      link={`/evento/${id}`}
      patrocinado={patrocinado}
      categoria={categoria}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-card-foreground/80">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{data}</span>
            <span>•</span>
            <Clock className="h-4 w-4 text-primary" />
            <span>{hora}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-card-foreground/80">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{local}</span>
          </div>
        </div>
      </div>
    </CardBase>
  );
} 