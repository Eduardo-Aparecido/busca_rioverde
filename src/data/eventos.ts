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
    titulo: "Tecnoshow",
    imagem: "/images/eventos/tecnoshow/tecnoshow1.jpg",
    dataHora: converterDataHora("07/04/2025", "20:00"),
    duracao: 2,
    local: "Rod. GO-174 Km 252,5 - Zona Rural",
    categoria: "Tecnologia",
    patrocinado: false
  },
  {
    id: "2",
    titulo: "Banda Rocco",
    imagem: "/images/eventos/banda_rocco/bandarocco_01.jpeg",
    dataHora: converterDataHora("12/04/2025", "20:00"),
    duracao: 3,
    local: "The Haus Coffee&Beer",
    categoria: "Música",
    patrocinado: false
  },
  {
    id: "3",
    titulo: "4° Edição Café Com Deus",
    imagem: "/images/eventos/cafe_com_deus/cafecomdeus.jpeg",
    dataHora: converterDataHora("12/04/2025", "10:00"),
    duracao: 8,
    local: "Jardim Goias",
    categoria: "Espiritualidade"
  },
  {
    id: "4",
    titulo: "Galpão da Ultra Pub",
    imagem: "/images/eventos/galpao_ultra/galpaoultra.png",
    dataHora: converterDataHora("26/04/2025", "22:00"),
    duracao: 2,
    local: "Centro",
    categoria: "Musica"
  },
  {
    id: "5",
    titulo: "Carol Delgado",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    dataHora: converterDataHora("01/04/2025", "20:00"),
    duracao: 2,
    local: "The Haus Coffee&Beer",
    categoria: "Comédia Stand-Up",
    patrocinado: false
  },
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