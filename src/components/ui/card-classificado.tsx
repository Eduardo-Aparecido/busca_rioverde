import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CardClassificadoProps {
  titulo: string;
  descricao: string;
  imagem: string;
  categoria: string;
  preco: string;
  link: string;
}

export function CardClassificado({ 
  titulo, 
  descricao, 
  imagem, 
  categoria, 
  preco,
  link 
}: CardClassificadoProps) {
  return (
    <Link to={link} className="group">
      <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-white/90 dark:bg-zinc-900/90 text-black dark:text-white">
              {categoria}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-black dark:text-white line-clamp-2 mb-2">{titulo}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2">{descricao}</p>
          <div className="flex items-center justify-between">
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">{preco}</span>
            <Button variant="outline" size="sm" className="text-xs">
              Ver mais
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
} 