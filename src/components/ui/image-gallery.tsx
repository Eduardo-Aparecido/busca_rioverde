import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="relative aspect-square overflow-hidden rounded-lg group"
          >
            <img
              src={image}
              alt={`Imagem ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm">Clique para ampliar</span>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedImage}
                alt="Imagem ampliada"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 