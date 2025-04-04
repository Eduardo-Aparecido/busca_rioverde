export interface StoryContent {
  tipo: "video" | "imagem";
  url: string;
  duracao?: number;
  descricao?: string;
}

export interface Story {
  id: string;
  titulo: string;
  imagem: string;
  link: string;
  conteudo: StoryContent | StoryContent[];
} 