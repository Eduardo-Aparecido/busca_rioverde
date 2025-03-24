import { Link } from "react-router-dom";

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
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        {patrocinado && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
            Patrocinado
          </div>
        )}
        <div className="relative h-48">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="bg-red-500 px-2 py-1 rounded">{classificacao}</span>
              <span>{duracao}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
            {titulo}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{cinema}</p>
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
          <p className="text-sm text-gray-500 mt-2">{data}</p>
        </div>
      </div>
    </Link>
  );
} 