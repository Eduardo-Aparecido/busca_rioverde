import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState, useEffect, useCallback } from "react";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { motion, PanInfo } from "framer-motion";

/**
 * Interface que define a estrutura de um conteúdo do story
 * Usada tanto no StoryModal quanto no componente Story
 * @property tipo - Define se o conteúdo é uma imagem ou vídeo
 * @property url - URL do arquivo de mídia
 * @property duracao - Tempo em segundos que o conteúdo deve ser exibido (padrão: 5s para imagens)
 * @property descricao - Texto opcional que aparece sobreposto à imagem
 */
interface StoryContent {
  tipo: "video" | "imagem";
  url: string;
  duracao?: number;
  descricao?: string;
}

/**
 * Props do componente StoryModal
 */
interface StoryModalProps {
  story: {
    id: string;
    titulo: string;
    imagem: string;
    link: string;
    conteudo: StoryContent | StoryContent[];
  };
  allStories: Array<{
    id: string;
    titulo: string;
    imagem: string;
    link: string;
    conteudo: StoryContent | StoryContent[];
  }>;
  currentIndex: number;
  onClose: () => void;
  onStoryChange: (index: number) => void;
}

export function StoryModal({ story, allStories, currentIndex, onClose, onStoryChange }: StoryModalProps) {
  const [currentStory, setCurrentStory] = useState(story);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Converte o conteúdo para array se for um único item
  const content = Array.isArray(currentStory?.conteudo) 
    ? currentStory.conteudo 
    : [currentStory?.conteudo];

  // Atualiza o story atual quando as props mudam
  useEffect(() => {
    if (!story) {
      setError('Story não fornecido');
      onClose();
      return;
    }

    if (!story.conteudo) {
      setError('Conteúdo do story não fornecido');
      onClose();
      return;
    }

    setCurrentStory(story);
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsLoading(false);
    setIsOpen(true);
  }, [story, onClose]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  // Função para navegar para o story anterior
  const handlePreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentIndex > 0) {
      onStoryChange(currentIndex - 1);
    }
  }, [currentStoryIndex, currentIndex, onStoryChange]);

  // Função para navegar para o próximo story
  const handleNextStory = useCallback(() => {
    if (currentStoryIndex < content.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentIndex < allStories.length - 1) {
      onStoryChange(currentIndex + 1);
    } else {
      handleClose();
    }
  }, [currentStoryIndex, content.length, currentIndex, allStories.length, onStoryChange, handleClose]);

  // Gerencia o progresso e avanço automático
  useEffect(() => {
    if (!content[currentStoryIndex] || isPaused) return;

    const currentContent = content[currentStoryIndex];
    const duration = currentContent.duracao ? currentContent.duracao * 1000 : 5000;
    const interval = 100; // Atualiza o progresso a cada 100ms
    const steps = duration / interval;

    if (currentContent.tipo === "imagem") {
      const timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / steps);
          if (next >= 100) {
            clearInterval(timer);
            handleNextStory();
            return 0;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [currentStoryIndex, content, isPaused, handleNextStory]);

  // Manipuladores de eventos de mouse/touch
  const handleMouseDown = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Adiciona suporte para navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita conflitos com outros eventos de teclado
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          handlePreviousStory();
          break;
        case 'ArrowRight':
          handleNextStory();
          break;
        case 'Escape':
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePreviousStory, handleNextStory, handleClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldClose = info.velocity.y > 20 || (info.offset.y > 200 && info.velocity.y >= 0);
    if (shouldClose) {
      handleClose();
    }
  };

  // Se não houver conteúdo válido, fecha o modal
  if (!content?.length) {
    handleClose();
    return null;
  }

  const currentContent = content[currentStoryIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[45%] h-[75vh] sm:h-[85vh] md:h-[90vh] p-0 bg-transparent backdrop-blur-md mt-8 sm:mt-0">
        <motion.div 
          className="relative h-full rounded-lg overflow-hidden bg-white/5 dark:bg-black/5 backdrop-blur-2xl border border-white/20"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
        >
          {/* Indicador visual de arraste */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full sm:hidden" />
          
          <VisuallyHidden>
            <DialogTitle>Story: {currentStory.titulo}</DialogTitle>
            <DialogDescription>Visualizador de stories do {currentStory.titulo}</DialogDescription>
          </VisuallyHidden>
          <div className="relative w-full h-full flex items-center justify-center bg-transparent">
            <div className="relative w-full h-full rounded-xl p-[2px] bg-gradient-to-tr from-purple-600/30 via-pink-500/30 to-blue-600/30 backdrop-blur-xl">
              {/* Barra de progresso */}
              <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
                {content.map((_, index) => (
                  <div 
                    key={index}
                    className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div 
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ 
                        width: index === currentStoryIndex ? `${progress}%` : 
                               index < currentStoryIndex ? '100%' : '0%' 
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Botão de fechar */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute -top-8 -right-8 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Área de toque para pausar/continuar com feedback visual */}
              <div 
                className={`absolute inset-0 z-40 transition-colors duration-200 ${isPaused ? 'bg-black/20 backdrop-blur-[2px]' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
              >
                {isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                      <svg 
                        className="w-8 h-8 text-white" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M8 5v14l11-7z" 
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de navegação */}
              {(currentStoryIndex > 0 || currentIndex > 0) && (
                <button
                  type="button"
                  onClick={handlePreviousStory}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              {(currentStoryIndex < content.length - 1 || currentIndex < allStories.length - 1) && (
                <button
                  type="button"
                  onClick={handleNextStory}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              )}

              {/* Container interno com fundo transparente */}
              <div className="relative w-full h-full bg-transparent rounded-xl overflow-hidden">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white">Carregando...</p>
                  </div>
                ) : error ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white">{error}</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-transparent">
                    {currentContent.tipo === "video" ? (
                      <video
                        key={currentContent.url}
                        src={currentContent.url}
                        className="w-full h-full object-contain"
                        controls={false}
                        onEnded={handleNextStory}
                        autoPlay
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        key={currentContent.url}
                        src={currentContent.url}
                        alt={currentStory.titulo}
                        className="w-full h-full object-contain"
                      />
                    )}
                    {currentContent.descricao && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm text-white">
                        {currentContent.descricao}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}