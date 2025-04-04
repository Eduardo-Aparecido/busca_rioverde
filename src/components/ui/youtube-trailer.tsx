import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "./button";

interface YouTubeTrailerProps {
  videoId: string;
  thumbnailUrl?: string;
  title: string;
  className?: string;
}

export function YouTubeTrailer({ videoId, thumbnailUrl, title, className = "" }: YouTubeTrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {!isPlaying ? (
        <>
          <div className="relative aspect-video">
            <img
              src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary text-white hover:scale-105 transition-transform"
                onClick={handlePlay}
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium">{title}</h3>
          </div>
        </>
      ) : (
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white z-10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 