import { ChevronLeft, ChevronRight } from "lucide-react";
import { Story } from "./story";
import { useRef, useState, useEffect } from "react";

interface Story {
  id: string;
  imagem: string;
  titulo: string;
  link: string;
  conteudo: {
    tipo: "video" | "imagem";
    url: string;
    duracao?: number;
  } | Array<{
    tipo: "video" | "imagem";
    url: string;
    duracao?: number;
  }>;
  visto?: boolean;
}

interface StoriesContainerProps {
  stories: Story[];
}

export function StoriesContainer({ stories }: StoriesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const scrollAmount = direction === 'left' ? -300 : 300;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-colors"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto py-4 px-2 scrollbar-none scroll-smooth"
      >
        {stories.map((story) => (
          <Story key={story.id} {...story} />
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-colors"
          aria-label="Rolar para a direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
} 