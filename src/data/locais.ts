export interface Local {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  website?: string;
  horariosFuncionamento: {
    dia: string;
    horarios: string[];
  }[];
  ultimaAtualizacao: string;
  avaliacao: number;
  avaliacoes: number;
  banner: string;
  logo: string;
  galeria: string[];
  comodidades: string[];
  latitude: number;
  longitude: number;
}

export const locais: Local[] = [
  {
    id: "1",
    nome: "Finnegans",
    descricao: `Experiências saborosas em self service por quilo Gastrobar Culinária variada Petiscos O hambúrguer que você vai amar Drinks exclusivos.`,
    endereco: "Rua Rafael Nascimento, 219 - Centro",
    telefone: "(64) 2142-6535",
    website: "finnegansmusicandbeer.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "14:00"] },
      { dia: "Terça", horarios: ["11:00", "14:00", "18:00", "00:00"] },
      { dia: "Quarta", horarios: ["18:00", "23:00"] },
      { dia: "Quinta", horarios: ["18:00", "00:00"] },
      { dia: "Sexta", horarios: ["18:00", "01:00"] },
      { dia: "Sábado", horarios: ["16:00", "01:00"] },
      { dia: "Domingo", horarios: ["16:00", "22:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T14:30:00",
    avaliacao: 4.5,
    avaliacoes: 128,
    banner: "/images/onde_ir/finnegans/finnegans_02.png",
    logo: "/images/onde_ir/finnegans/finnegans_logo.png",
    galeria: [
      "/images/onde_ir/finnegans/finnegans_02.png",
      "/images/onde_ir/finnegans/finnegans_07.png",
      "/images/onde_ir/finnegans/finnegans_04.png",
      "/images/onde_ir/finnegans/finnegans_05.png",
      "/images/onde_ir/finnegans/finnegans_06.png",
      "/images/onde_ir/finnegans/finnegans_08.png"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Estacionamento",
      "Aceita Cartão",
      "Música ao Vivo",
      "Pet Friendly"
    ],
    latitude: -17.79942422405687,
    longitude: -50.93200656856998
  },
  {
    id: "2",
    nome: "Restaurante Sabor & Arte",
    descricao: `Um restaurante sofisticado que oferece o melhor da gastronomia contemporânea com ingredientes locais.`,
    endereco: "Av. Brasil, 456 - Centro",
    telefone: "(64) 98888-8888",
    website: "www.saborarte.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "15:00"] },
      { dia: "Terça", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Quarta", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Quinta", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Sexta", horarios: ["11:00", "15:00", "19:00", "00:00"] },
      { dia: "Sábado", horarios: ["11:00", "16:00", "19:00", "00:00"] },
      { dia: "Domingo", horarios: ["11:00", "16:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T12:00:00",
    avaliacao: 4.7,
    avaliacoes: 256,
    banner: "/images/onde_ir/sabor_arte/sabor_arte_banner.png",
    logo: "/images/onde_ir/sabor_arte/sabor_arte_logo.png",
    galeria: [
      "/images/onde_ir/sabor_arte/sabor_arte_01.png",
      "/images/onde_ir/sabor_arte/sabor_arte_02.png",
      "/images/onde_ir/sabor_arte/sabor_arte_03.png",
      "/images/onde_ir/sabor_arte/sabor_arte_04.png"
    ],
    comodidades: [
      "Ar Condicionado",
      "Estacionamento",
      "Aceita Cartão",
      "Acessibilidade",
      "Reservas"
    ],
    latitude: -16.686815,
    longitude: -49.264710
  }
]; 