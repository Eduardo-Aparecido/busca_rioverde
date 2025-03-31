/**
 * Importação dos componentes e tipos necessários
 * - ReactNode: Tipo para elementos React (permite JSX/HTML)
 * - Link: Componente de navegação do React Router
 */
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

/**
 * Interface que define as propriedades base para todos os cards do sistema
 * @property id - Identificador único do item
 * @property titulo - Título do card (aceita JSX)
 * @property imagem - URL da imagem de capa
 * @property link - URL para a página de detalhes
 * @property patrocinado - Indica se é conteúdo patrocinado (opcional)
 * @property categoria - Categoria do item (opcional)
 * @property children - Conteúdo adicional do card (slots)
 */
interface CardBaseProps {
  id: string;
  titulo: ReactNode;
  imagem: string;
  link: string;
  patrocinado?: boolean;
  categoria?: string;
  children: React.ReactNode;
}

/**
 * Componente CardBase
 * 
 * Componente base para todos os cards do sistema
 * Fornece uma estrutura consistente com imagem, título e conteúdo
 * 
 * Características:
 * - Layout padronizado para todos os cards
 * - Imagem de capa com lazy loading
 * - Categoria opcional com estilo consistente
 * - Botão de favorito
 * - Tag de "Patrocinado" quando aplicável
 * - Slot para conteúdo personalizado
 * 
 * Usado por:
 * - EventoCard
 * - NoticiaCard
 * - LocalCard
 * - FilmeCard
 * 
 * @example
 * <CardBase
 *   id="1"
 *   titulo="Título do Card"
 *   imagem="/imagens/exemplo.jpg"
 *   link="/detalhes/1"
 *   categoria="Categoria"
 *   patrocinado={true}
 * >
 *   <p>Conteúdo adicional do card</p>
 * </CardBase>
 */
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
    <Link to={link} className="group block h-full">
      <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors h-full flex flex-col">
        {/* Container da imagem com overflow hidden */}
        <div className="relative aspect-[4/3] md:aspect-video overflow-hidden">
          <img
            src={imagem}
            alt={typeof titulo === 'string' ? titulo : 'Imagem do card'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badge de categoria (se fornecida) */}
          {categoria && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white">
                {categoria}
              </Badge>
            </div>
          )}
        </div>

        {/* Conteúdo do card */}
        <div className="p-3 md:p-4 flex flex-col flex-grow">
          {/* Título */}
          <h3 className="font-medium text-zinc-900 dark:text-white line-clamp-2 min-h-[2.5rem] mb-2">
            {titulo}
          </h3>

          {/* Conteúdo adicional */}
          <div className="flex-grow flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
} 