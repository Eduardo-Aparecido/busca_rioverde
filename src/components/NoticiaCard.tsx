/**
 * Importação dos componentes e tipos necessários
 * - ReactNode: Tipo para elementos React
 * - CardBase: Componente base para todos os cards
 * - Badge: Componente para tags e status
 * - Calendar: Ícone de calendário do Lucide
 */
import { ReactNode } from "react";
import { CardBase } from "@/components/ui/card-base";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

/**
 * Interface que define as propriedades do card de notícia
 * @property id - Identificador único da notícia
 * @property titulo - Título da notícia
 * @property imagem - URL da imagem de capa
 * @property resumo - Texto curto descrevendo a notícia
 * @property data - Data de publicação (formato: DD/MM/YYYY)
 * @property categoria - Categoria da notícia (ex: "Cultura", "Eventos", etc)
 * @property patrocinado - Indica se é conteúdo patrocinado (opcional)
 */
interface NoticiaCardProps {
  id: string;
  titulo: string;
  imagem: string;
  resumo: string;
  data: string;
  categoria: string;
  patrocinado?: boolean;
}

/**
 * Componente NoticiaCard
 * 
 * Exibe um card com informações resumidas de uma notícia
 * Usado na listagem de notícias e na página inicial
 * 
 * Características:
 * - Usa o CardBase para manter consistência visual
 * - Exibe resumo limitado a 2 linhas
 * - Mostra data de publicação com ícone
 * - Badge de "Patrocinado" quando aplicável
 * - Link para página de detalhes da notícia
 */
export function NoticiaCard({
  id,
  titulo,
  imagem,
  resumo,
  data,
  categoria,
  patrocinado = false
}: NoticiaCardProps) {
  // Constrói o link para a página de detalhes da notícia
  const detailsLink = `/novidade/${id}`;

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
        titulo={titulo}
        imagem={imagem}
        link={detailsLink}
        categoria={categoria}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Resumo da notícia limitado a 2 linhas */}
          <p className="text-sm text-card-foreground/80 line-clamp-2 mb-2">{resumo}</p>

          {/* Rodapé com data e badge de patrocinado */}
          <div className="flex justify-between items-center">
            {/* Data de publicação */}
            <div className="flex items-center gap-2 text-sm text-card-foreground/80">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{typeof data === 'string' ? data : new Date(data).toLocaleDateString("pt-BR")}</span>
            </div>

            {/* Badge de Patrocinado (se aplicável) */}
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