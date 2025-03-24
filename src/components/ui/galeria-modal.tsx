import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GaleriaModalProps {
  imagens: string[];
  imagemAtual: number;
  onClose: () => void;
  onImagemChange: (index: number) => void;
}

export function GaleriaModal({
  imagens,
  imagemAtual,
  onClose,
  onImagemChange,
}: GaleriaModalProps) {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onImagemChange(imagemAtual === 0 ? imagens.length - 1 : imagemAtual - 1);
      } else if (e.key === "ArrowRight") {
        onImagemChange(imagemAtual === imagens.length - 1 ? 0 : imagemAtual + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imagemAtual, imagens.length, onClose, onImagemChange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="container mx-auto h-full flex items-center justify-center p-4">
        <div
          className="relative max-w-5xl w-full aspect-[16/9] bg-card rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {carregando && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={imagens[imagemAtual]}
            alt={`Imagem ${imagemAtual + 1}`}
            className="w-full h-full object-contain"
            onLoad={() => setCarregando(false)}
          />

          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background"
            onClick={() => onImagemChange(imagemAtual === 0 ? imagens.length - 1 : imagemAtual - 1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background"
            onClick={() => onImagemChange(imagemAtual === imagens.length - 1 ? 0 : imagemAtual + 1)}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {imagens.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === imagemAtual ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => onImagemChange(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 