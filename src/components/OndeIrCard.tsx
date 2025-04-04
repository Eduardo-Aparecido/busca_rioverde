import { CardBase } from "@/components/ui/card-base";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface OndeIrCardProps {
  id: string;
  titulo: string;
  imagem: string;
  local: string;
  categoria: string;
  patrocinado?: boolean;
}

// Componente que exibe um card de local com informações básicas
export function OndeIrCard({ 
  id, 
  titulo, 
  imagem, 
  local, 
  categoria,
  patrocinado = false 
}: OndeIrCardProps) {
  const detailsLink = `/local/${id}`;

  return (
    <div className="group relative">
      <CardBase 
        link={detailsLink}
        id={id}
        titulo={titulo}
        imagem={imagem}
        categoria={categoria}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{local}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            {patrocinado && (
              <Badge variant="secondary" className="text-xs">
                Patrocinado
              </Badge>
            )}
          </div>
        </div>
      </CardBase>
    </div>
  );
} 