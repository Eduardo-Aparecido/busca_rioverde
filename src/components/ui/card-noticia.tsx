import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface CardNoticiaProps {
  id: string;
  titulo: string;
  imagem: string;
  resumo: string;
  data: string;
  categoria: string;
  index?: number;
}

const CardNoticia = ({
  id,
  titulo,
  imagem,
  resumo,
  data,
  categoria,
  index = 0,
}: CardNoticiaProps) => {
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
      <div className="h-full overflow-hidden rounded-lg bg-card border border-border/50 shadow-sm card-hover">
        <div className="relative aspect-video overflow-hidden">
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
          <h3 className="text-base font-medium text-foreground line-clamp-1 mb-1">
            {titulo}
          </h3>
          
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{data}</span>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {resumo}
          </p>
          
          <Link
            to={`/novidade/${id}`}
            className="text-xs font-medium text-accent hover:underline"
          >
            Ler mais
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CardNoticia;
