import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface CardBaseProps {
  id: string;
  titulo: string;
  imagem: string;
  link: string;
  patrocinado?: boolean;
  categoria?: string;
  children: React.ReactNode;
}

export function CardBase({
  id,
  titulo,
  imagem,
  link,
  patrocinado = false,
  categoria,
  children
}: CardBaseProps) {
  return (
    <Link to={link} className="block h-full">
      <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md h-full flex flex-col">
        <div className="absolute top-2 right-2 z-10">
          <button className="p-2 rounded-full bg-background/80 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-foreground" />
          </button>
        </div>
        {categoria && (
          <div className="absolute top-2 left-2 z-10">
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">
              {categoria}
            </div>
          </div>
        )}
        <div className="relative w-full">
          <div className="aspect-[16/9]">
            <img
              src={imagem}
              alt={titulo}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col min-h-[120px]">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-1 mb-2">
            {titulo}
          </h3>
          <div className="flex-grow">
            {children}
          </div>
          <div className="h-6 flex items-center mt-2">
            {patrocinado && (
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                Patrocinado
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 