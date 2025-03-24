import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Pause, Play, Share2 } from "lucide-react";

interface StoryContent {
  tipo: "video" | "imagem";
  url: string;
  duracao?: number;
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: StoryContent[];
}

export function StoryModal({ isOpen, onClose, content }: StoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentContent = content[currentIndex];
  const duration = currentContent?.duracao || (currentContent?.tipo === "imagem" ? 5 : 0);

  const goToNext = () => {
    if (currentIndex < content.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (!isOpen || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / (duration * 1000)) * 100;
      });
    }, 100);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, duration, currentIndex, isPaused]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-[120px] left-0 right-0 z-50 flex items-start justify-center"
      onClick={onClose}
    >
      {/* Fundo com blur */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl" />

      {/* Container do modal com borda roxa */}
      <div className="relative bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-0.5 rounded-2xl z-10">
        <div className="relative bg-gradient-to-br from-neutral-950 to-neutral-900 rounded-2xl overflow-hidden">
          {/* Container do conteúdo */}
          <div 
            className="relative w-[90vw] max-w-[360px] aspect-[9/16] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botões de Navegação */}
            {currentIndex > 0 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}
            
            {currentIndex < content.length - 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Barra de Progresso */}
            <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
              {content.map((_, index) => (
                <div 
                  key={index}
                  className="h-0.5 bg-white/30 flex-1 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ 
                      width: index < currentIndex ? '100%' : 
                             index === currentIndex ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Cabeçalho */}
            <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between z-20">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-full hover:bg-black/20"
              >
                {isPaused ? (
                  <Play className="h-5 w-5 text-white" />
                ) : (
                  <Pause className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/20"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="w-full h-full">
              {currentContent.tipo === "video" ? (
                <video
                  key={currentContent.url}
                  src={currentContent.url}
                  className="w-full h-full object-contain"
                  autoPlay
                  onEnded={goToNext}
                  controls={false}
                  playsInline
                  muted={isPaused}
                />
              ) : (
                <img
                  key={currentContent.url}
                  src={currentContent.url}
                  alt="Story"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Rodapé */}
            <div className="absolute bottom-4 right-4 z-20">
              <button className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40">
                <Share2 className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}