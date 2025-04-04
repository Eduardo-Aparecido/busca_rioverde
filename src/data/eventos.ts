import { parse, format } from "date-fns";

export interface Evento {
  id: string;
  titulo: string;
  imagem: string;
  dataHora: string; // ISO string format
  duracao?: number;
  local: string;
  categoria: string;
  patrocinado?: boolean;
}

// Converte a data e hora do formato amigável para ISO string
function converterDataHora(dia: string, hora: string): string {
  const data = parse(dia + " " + hora, "dd/MM/yyyy HH:mm", new Date());
  return data.toISOString();
}

// Lista de eventos
export const eventos: Evento[] = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    dataHora: converterDataHora("01/04/2024", "20:00"),
    duracao: 2,
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Comédia Stand-Up",
    patrocinado: true
  },
  {
    id: "2",
    titulo: "Banda Rocco",
    imagem: "/images/eventos/banda_rocco/bandarocco_01.jpeg",
    dataHora: converterDataHora("12/04/2025", "20:00"),
    duracao: 3,
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Música",
    patrocinado: true
  },
  {
    id: "3",
    titulo: "Feira de Artesanato Regional",
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    dataHora: converterDataHora("01/12/2024", "10:00"),
    duracao: 8,
    local: "Centro de Convenções",
    categoria: "Cultura"
  },
  {
    id: "4",
    titulo: "Apresentação de Dança Contemporânea",
    imagem: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    dataHora: converterDataHora("03/12/2024", "19:30"),
    duracao: 2,
    local: "Teatro Municipal",
    categoria: "Cultura"
  },
  {
    id: "5",
    titulo: "Campeonato de Futsal",
    imagem: "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    dataHora: converterDataHora("05/12/2024", "14:00"),
    duracao: 4,
    local: "Ginásio Municipal",
    categoria: "Esporte"
  },
  {
    id: "6",
    titulo: "Workshop de Fotografia",
    imagem: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    dataHora: converterDataHora("08/12/2024", "09:00"),
    duracao: 8,
    local: "Centro Cultural",
    categoria: "Educação"
  }
];

// Categorias disponíveis
export const categoriasEventos = [
  "Todos",
  "Comédia Stand-Up",
  "Música",
  "Cultura",
  "Esporte",
  "Educação"
] as const;

export type CategoriaEvento = typeof categoriasEventos[number]; 