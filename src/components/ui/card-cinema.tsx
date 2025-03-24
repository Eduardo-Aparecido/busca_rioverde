import { Calendar, Clock, Theater } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CardCinemaProps {
  id: string;
  titulo: string;
  imagem: string;
  cinema: string;
  horarios: string[];
  data: string;
  classificacao: string;
  duracao: string;
}

const CardCinema = ({
  id,
  titulo,
  imagem,
  cinema,
  horarios,
  data,
  classificacao,
  duracao,
}: CardCinemaProps) => {
  return (
    <div className="group bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
      <div className="flex flex-col md:flex-row">
        {/* Poster do Filme */}
        <Link 
          to={`/filme/${id}`} 
          className="relative md:w-[220px] aspect-[2/3] overflow-hidden"
        >
          <img
            src={`/images/${imagem}`}
            alt={titulo}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="bg-yellow-500 text-black font-bold border-none"
            >
              {classificacao}
            </Badge>
          </div>
        </Link>

        {/* Informações do Filme */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <Link to={`/filme/${id}`} className="group-hover:opacity-75 transition-opacity">
              <h3 className="text-2xl font-bold text-white mb-2">{titulo}</h3>
            </Link>
            
            <div className="flex flex-wrap gap-4 text-zinc-400 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{duracao}</span>
              </div>
              <div className="flex items-center gap-2">
                <Theater className="h-4 w-4" />
                <span>{cinema}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{data}</span>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-3">Horários disponíveis:</h4>
            <div className="flex flex-wrap gap-2">
              {horarios.map((horario, index) => (
                <button
                  key={index}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                >
                  {horario}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CardCinema };
