/**
 * Importação dos componentes e tipos necessários
 * - ReactNode: Tipo para elementos React (permite JSX/HTML)
 * - CardBase: Componente base para todos os cards
 * - Star: Ícone de estrela do Lucide para avaliação
 * - Badge: Componente para tags e status
 * - MapPin: Ícone de localização do Lucide (não utilizado atualmente)
 */
import { ReactNode } from "react";
import { CardBase } from "@/components/ui/card-base";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

/**
 * Interface que define as propriedades do card de estabelecimento
 * @property id - Identificador único do local
 * @property nome - Nome do estabelecimento (aceita JSX)
 * @property imagem - URL da imagem de capa
 * @property endereco - Endereço do local (aceita JSX)
 * @property categoria - Categoria do estabelecimento (ex: "Bar", "Restaurante", etc)
 * @property avaliacao - Nota do estabelecimento (0-5)
 * @property patrocinado - Indica se é um estabelecimento patrocinado (opcional)
 */
interface LocalCardProps {
  id: string;
  nome: ReactNode;
  imagem: string;
  endereco: ReactNode;
  categoria: string;
  avaliacao: number;
  patrocinado?: boolean;
}

/**
 * Componente LocalCard
 * 
 * Exibe um card com informações resumidas de um estabelecimento
 * Usado na listagem de locais e na página inicial
 * 
 * Características:
 * - Usa o CardBase para manter consistência visual
 * - Exibe avaliação com estrela
 * - Mostra endereço limitado a 1 linha
 * - Badge de "Patrocinado" quando aplicável
 * - Link para página de detalhes do local
 * 
 * @example
 * <LocalCard
 *   id="1"
 *   nome="Restaurante Exemplo"
 *   imagem="/locais/restaurante.jpg"
 *   endereco="Rua Exemplo, 123"
 *   categoria="Restaurante"
 *   avaliacao={4.5}
 *   patrocinado={true}
 * />
 */
export function LocalCard({
  id,
  nome,
  imagem,
  endereco,
  categoria,
  avaliacao,
  patrocinado = false
}: LocalCardProps) {
  // Constrói o link para a página de detalhes do local
  const detailsLink = `/local/${id}`;

  return (
    <div className="group relative">
      {/* 
        CardBase: Componente base que fornece a estrutura comum dos cards
        - Recebe o link para detalhes
        - Mantém consistência visual com outros cards
        - Gerencia aspectos comuns como imagem e título
      */}
      <CardBase
        id={id}
        titulo={nome}
        imagem={imagem}
        link={detailsLink}
        patrocinado={patrocinado}
        categoria={categoria}
      >
        <div className="flex flex-col gap-2">
          {/* Avaliação com estrela */}
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{avaliacao}</span>
          </div>

          {/* Endereço limitado a 1 linha */}
          <div className="text-sm text-muted-foreground line-clamp-1">
            {endereco}
          </div>

          {/* Badge de Patrocinado (se aplicável) */}
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