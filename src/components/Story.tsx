interface StoryProps {
  titulo: string;
  imagem: string;
}

export function Story({ titulo, imagem }: StoryProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-[2px] rounded-full">
          <div className="w-full h-full bg-white dark:bg-black rounded-full p-[2px]">
            <img
              src={imagem}
              alt={titulo}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
      <span className="text-zinc-900 dark:text-white text-xs text-center">{titulo}</span>
    </div>
  );
} 