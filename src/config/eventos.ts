interface ConfigEvento {
  id: string;
  titulo: string;
  imagem: string;
  dia: string; // formato: "DD/MM/YYYY"
  hora: string; // formato: "HH:mm"
  duracao: number; // em horas
  local: string;
  categoria: string;
}

export const eventosConfig: ConfigEvento[] = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    dia: "01/04/2024", // Amanhã
    hora: "20:00",
    duracao: 2,
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Comédia Stand-Up",
  },
  {
    id: "2",
    titulo: "Show de MPB com Artistas Locais",
    imagem: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
    dia: "31/03/2024",
    hora: "20:30",
    duracao: 3,
    local: "Teatro Municipal",
    categoria: "Música",
  },
  {
    id: "3",
    titulo: "Feira de Artesanato Regional",
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    dia: "01/04/2024",
    hora: "10:00",
    duracao: 8,
    local: "Centro de Convenções",
    categoria: "Cultura",
  }
]; 