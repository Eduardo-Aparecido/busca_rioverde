import { CardBase } from "@/components/ui/card-base";
import { Calendar } from "lucide-react";

interface NoticiaCardProps {
  id: string;
  titulo: string;
  imagem: string;
  resumo: string;
  data: string;
  categoria: string;
  patrocinado?: boolean;
}

export function NoticiaCard({
  id,
  titulo,
  imagem,
  resumo,
  data,
  categoria,
  patrocinado = false
}: NoticiaCardProps) {
  return (
    <CardBase
      id={id}
      titulo={titulo}
      imagem={imagem}
      link={`/noticia/${id}`}
      patrocinado={patrocinado}
      categoria={categoria}
    >
      <div className="flex flex-col justify-between h-full">
        <p className="text-sm text-card-foreground/80 line-clamp-2 mb-2">{resumo}</p>
        <div className="flex items-center gap-2 text-sm text-card-foreground/80">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{data}</span>
        </div>
      </div>
    </CardBase>
  );
} 