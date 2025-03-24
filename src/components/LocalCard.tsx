import { CardBase } from "@/components/ui/card-base";
import { Star } from "lucide-react";

interface LocalCardProps {
  id: string;
  nome: string;
  imagem: string;
  endereco: string;
  categoria: string;
  avaliacao: number;
  patrocinado?: boolean;
}

export function LocalCard({
  id,
  nome,
  imagem,
  endereco,
  categoria,
  avaliacao,
  patrocinado = false
}: LocalCardProps) {
  return (
    <CardBase
      id={id}
      titulo={nome}
      imagem={imagem}
      link={`/local/${id}`}
      patrocinado={patrocinado}
      categoria={categoria}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-muted-foreground">({avaliacao.toFixed(1)})</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{endereco}</p>
      </div>
    </CardBase>
  );
} 