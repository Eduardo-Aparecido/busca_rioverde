import { useState } from "react";
import { StoryModal } from "./story-modal";

interface StoryProps {
  id: string;
  imagem: string;
  titulo: string;
  link: string;
  visto?: boolean;
  conteudo: {
    tipo: "video" | "imagem";
    url: string;
    duracao?: number;
  } | Array<{
    tipo: "video" | "imagem";
    url: string;
    duracao?: number;
  }>;
}

export function Story({ id, imagem, titulo, conteudo, visto = false }: StoryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="flex flex-col items-center gap-2 w-24"
      >
        <div className={`p-[3px] rounded-full ${visto ? 'bg-muted' : 'bg-gradient-to-tr from-primary to-accent'}`}>
          <div className="p-0.5 rounded-full bg-background">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <img
                src={imagem}
                alt={titulo}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <span className="text-sm text-foreground/80 truncate w-full text-center">
          {titulo}
        </span>
      </button>

      <StoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={Array.isArray(conteudo) ? conteudo : [conteudo]}
      />
    </>
  );
} 