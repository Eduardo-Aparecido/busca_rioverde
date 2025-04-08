interface ImageItem {
  url: string;
  descricao?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  title?: string;
  onImageClick?: (index: number) => void;
}

export function ImageGallery({ images, title, onImageClick }: ImageGalleryProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageClick?.(index)}
            className="relative aspect-square overflow-hidden rounded-lg group"
          >
            <img
              src={image.url}
              alt={image.descricao || `Imagem ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm">Clique para ampliar</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
