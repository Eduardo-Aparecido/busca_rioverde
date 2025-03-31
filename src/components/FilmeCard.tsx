/**
 * Importação do componente Link do React Router
 * Usado para navegação entre páginas sem recarregar
 */
import { Link } from "react-router-dom";

/**
 * Interface que define as propriedades do card de filme
 * @property id - Identificador único do filme
 * @property titulo - Título do filme
 * @property imagem - URL do poster do filme
 * @property cinema - Nome do cinema onde está em exibição
 * @property horarios - Array com os horários das sessões
 * @property data - Data da exibição (formato: DD/MM/YYYY)
 * @property classificacao - Classificação indicativa (ex: "14", "16", "L")
 * @property duracao - Duração do filme (formato: "Xh YYmin")
 * @property patrocinado - Indica se é um filme patrocinado (opcional)
 */
interface FilmeCardProps {
  id: string;
  titulo: string;
  imagem: string;
  cinema: string;
  horarios: string[];
  data: string;
  classificacao: string;
  duracao: string;
  patrocinado?: boolean;
}

/**
 * Componente FilmeCard
 * 
 * Exibe um card com informações de um filme em cartaz
 * Usado na listagem de filmes e na página inicial
 * 
 * Características:
 * - Design mais elaborado que os outros cards
 * - Imagem com gradiente e informações sobrepostas
 * - Classificação indicativa e duração em destaque
 * - Lista de horários das sessões
 * - Efeito de escala no hover
 * - Tag de "Patrocinado" quando aplicável
 * 
 * @example
 * <FilmeCard
 *   id="1"
 *   titulo="Filme Exemplo"
 *   imagem="/filmes/poster.jpg"
 *   cinema="Cinema Exemplo"
 *   horarios={["14:30", "17:00", "19:30"]}
 *   data="01/04/2024"
 *   classificacao="14"
 *   duracao="2h 30min"
 *   patrocinado={true}
 * />
 */
export function FilmeCard({
  id,
  titulo,
  imagem,
  cinema,
  horarios,
  data,
  classificacao,
  duracao,
  patrocinado = false
}: FilmeCardProps) {
  return (
    <Link to={`/filme/${id}`} className="group">
      {/* Container principal com efeito de hover */}
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        {/* Badge de Patrocinado (se aplicável) */}
        {patrocinado && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
            Patrocinado
          </div>
        )}

        {/* Container da imagem com gradiente e informações */}
        <div className="relative h-48">
          {/* Poster do filme */}
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover"
          />
          {/* Gradiente sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Informações sobre a imagem */}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center gap-2 text-white text-sm">
              {/* Classificação indicativa */}
              <span className="bg-red-500 px-2 py-1 rounded">{classificacao}</span>
              {/* Duração do filme */}
              <span>{duracao}</span>
            </div>
          </div>
        </div>

        {/* Informações do filme */}
        <div className="p-4">
          {/* Título com efeito de hover */}
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
            {titulo}
          </h3>
          {/* Nome do cinema */}
          <p className="text-sm text-gray-600 mt-1">{cinema}</p>
          
          {/* Lista de horários */}
          <div className="flex flex-wrap gap-2 mt-2">
            {horarios.map((horario, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {horario}
              </span>
            ))}
          </div>
          
          {/* Data da exibição */}
          <p className="text-sm text-gray-500 mt-2">{data}</p>
        </div>
      </div>
    </Link>
  );
} 