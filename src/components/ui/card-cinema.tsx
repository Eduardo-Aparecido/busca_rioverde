import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CardCinemaProps {
  id: string;
  titulo: string;
  imagem: string;
  cinema: string;
  data: string;
  classificacao: string;
  duracao: string;
  genero?: string;
  descricao?: string;
}

export function CardCinema({
  id,
  titulo,
  imagem,
  cinema,
  data,
  classificacao,
  duracao,
  genero,
  descricao
}: CardCinemaProps) {
  return (
    <Link to={`/filme/${id}`}>
      <div className="group bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* Imagem do Filme */}
        <div className="relative aspect-video">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover"
          />
          {/* Classificação no canto superior esquerdo */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 text-black text-xs font-medium">
              {classificacao}
            </Badge>
          </div>
        </div>

        {/* Informações do filme */}
        <div className="p-4">
          <h3 className="text-base font-medium mb-1 line-clamp-2 text-zinc-900 dark:text-white">
            {titulo}
          </h3>
          {descricao && (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">
              {descricao}
            </p>
          )}
          <div className="flex flex-col gap-1 text-xs text-zinc-600 dark:text-zinc-400">
            {genero && <span>{genero}</span>}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{duracao}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
