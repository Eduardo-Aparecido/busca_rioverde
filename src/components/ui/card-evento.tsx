import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface CardEventoProps {
  id: string;
  titulo: string;
  imagem: string;
  data: string;
  hora: string;
  local: string;
  categoria: string;
  index?: number;
}

const CardEvento = ({
  id,
  titulo,
  imagem,
  data,
  hora,
  local,
  categoria,
  index = 0,
}: CardEventoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/images/${imagem}`;
    img.onload = () => setImageLoaded(true);
  }, [imagem]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/evento/${id}`} className="block h-full">
        <div className="h-full overflow-hidden rounded-lg bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 card-hover">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } hover:scale-110 transition-transform duration-500`}
              style={{
                backgroundImage: `url(/images/${imagem})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-background" />
            )}
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/90 text-white backdrop-blur-sm">
                {categoria}
              </span>
            </div>
          </div>
          
          <div className="p-3">
            <h3 className="text-base font-medium text-foreground line-clamp-1 mb-2 hover:text-accent transition-colors">
              {titulo}
            </h3>
            
            <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{data}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{hora}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{local}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CardEvento;
