import { useState } from "react";
import { StoryModal } from "./story-modal";

interface StoryProps {
  id: string;
  imagem: string;
  titulo: string;
  visto?: boolean;
  onClick?: () => void;
}

export function Story({ id, imagem, titulo, visto = false, onClick }: StoryProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col items-center gap-2"
    >
      {/* Container do círculo */}
      <div className="w-[96px] h-[96px] md:w-[112px] md:h-[112px] rounded-full p-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-600">
        {/* Círculo interno com a imagem */}
        <div className={`
          w-full h-full rounded-full overflow-hidden
          ${visto ? 'p-1 bg-zinc-800' : 'p-[2px] bg-black'}
        `}>
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Título */}
      <span className="text-xs text-center line-clamp-2 text-zinc-700 dark:text-zinc-300">
        {titulo}
      </span>
    </button>
  );
} 