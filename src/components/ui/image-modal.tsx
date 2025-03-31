import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function ImageModal({ 
  isOpen, 
  onClose, 
  imageUrl, 
  alt,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{alt}</p>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </button>
        </div>
        <div className="relative rounded-lg overflow-hidden bg-accent/5 group">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
          
          {/* Botões de navegação */}
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {hasPrevious && (
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-background"
                onClick={onPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Imagem anterior</span>
              </Button>
            )}
            {hasNext && (
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-background"
                onClick={onNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próxima imagem</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 