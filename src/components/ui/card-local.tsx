import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CardLocalProps {
  id: string;
  nome: string;
  imagem: string;
  endereco: string;
  categoria: string;
  avaliacao: number;
  index?: number;
}

const CardLocal = ({
  id,
  nome,
  imagem,
  endereco,
  categoria,
  avaliacao,
  index = 0,
}: CardLocalProps) => {
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
      <Link to={`/local/${id}`} className="block h-full">
        <div className="h-full overflow-hidden rounded-lg bg-card border border-border/50 shadow-sm card-hover">
          <div className="relative aspect-[16/9] overflow-hidden">
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
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-medium text-foreground line-clamp-1">
                {nome}
              </h3>
              
              <div className="flex items-center text-yellow-500">
                <Star className="fill-yellow-500 h-3 w-3" />
                <span className="text-xs font-medium ml-0.5">{avaliacao}</span>
              </div>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{endereco}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CardLocal;
