interface StoryProps {
  titulo: string;
  imagem: string;
}

export function Story({ titulo, imagem }: StoryProps) {
  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-[2px] rounded-full">
        <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full p-[2px]">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/0 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-zinc-900 dark:text-white text-xs text-center px-2">{titulo}</span>
      </div>
    </div>
  );
} 