import { useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { X, Pause } from "lucide-react";
import { Story } from "./Story";

interface Story {
  id: string;
  titulo: string;
  imagem: string;
  link: string;
  conteudo: {
    tipo: "video" | "imagem";
    url: string;
    duracao?: number;
    descricao?: string;
  } | Array<{
    tipo: "video" | "imagem";
    url: string;
    duracao?: number;
    descricao?: string;
  }>;
}

interface StoriesContainerProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export function StoriesContainer({ stories, onStoryClick }: StoriesContainerProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleClose = () => {
    setSelectedStory(null);
    setIsPaused(false);
  };

  return (
    <div className="relative">
      {/* Grid de stories */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => onStoryClick(index)}
            className="flex-none"
          >
            <Story {...story} />
          </button>
        ))}
      </div>

      {/* Modal do story */}
      <AlertDialog open={!!selectedStory} onOpenChange={handleClose}>
        <AlertDialogContent className="max-w-[90vw] h-[90vh] p-0 border-none bg-transparent">
          {selectedStory && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-2xl aspect-[9/16] bg-black rounded-lg overflow-hidden">
                {/* Botões de controle */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsPaused(!isPaused);
                    }}
                    className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                  >
                    <Pause className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Imagem do story */}
                <img
                  src={selectedStory.imagem}
                  alt={selectedStory.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 