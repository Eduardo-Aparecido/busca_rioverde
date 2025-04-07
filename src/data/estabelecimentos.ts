export interface Estabelecimento {
  id: string;
  nome: string;
  imagem: string;
  endereco: string;
  categoria: string;
  avaliacao: number;
  bairro: string;
  descricao: string;
  telefone: string;
  website?: string;
  horariosFuncionamento: {
    dia: string;
    horarios: string[];
  }[];
  ultimaAtualizacao: string;
  banner: string;
  logo: string;
  galeria: string[];
  comodidades: string[];
  latitude: number;
  longitude: number;
}

export const estabelecimentos: Estabelecimento[] = [
  {
    id: "1",
    nome: "Finnegans",
    imagem: "/images/onde_ir/finnegans/finnegans_07.png",
    endereco: "Centro",
    categoria: "Restaurantes",
    avaliacao: 4.8,
    bairro: "Centro",
    descricao: `Se você busca um restaurante por quilo que une sabor, qualidade e bem-estar, o Finnegans Gastronomia é a escolha certa! Desde 2019, este espaço vem conquistando clientes com um buffet variado, repleto de saladas frescas, pratos quentes e uma seleção de proteínas preparadas com ingredientes de alta qualidade.`,
    telefone: "(64) 2142-6535",
    website: "finnegansmusicandbeer.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "14:00"] },
      { dia: "Terça", horarios: ["11:00", "14:00", "18:00", "00:00"] },
      { dia: "Quarta", horarios: ["11:00", "14:00", "18:00", "00:00"] },
      { dia: "Quinta", horarios: ["11:00", "14:00", "18:00", "01:00"] },
      { dia: "Sexta", horarios: ["11:00", "14:00", "18:00", "01:00"] },
      { dia: "Sábado", horarios: ["11:00", "14:00", "18:00", "02:00"] },
      { dia: "Domingo", horarios: ["17:00", "00:00"] }
    ],
    ultimaAtualizacao: "2025-04-02T14:30:00",
    banner: "/images/onde_ir/finnegans/finnegans_02.png",
    logo: "/images/onde_ir/finnegans/finnegans_logo.png",
    galeria: [
      "/images/onde_ir/finnegans/finnegans_02.png",
      "/images/onde_ir/finnegans/finnegans_07.png",
      "/images/onde_ir/finnegans/finnegans_04.png",
      "/images/onde_ir/finnegans/finnegans_05.png",
      "/images/onde_ir/finnegans/finnegans_06.png",
      "/images/onde_ir/finnegans/finnegans_03.png"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Aceita Cartão",
      "Música ao Vivo"
    ],
    latitude: -17.79942422405687,
    longitude: -50.93200656856998
  },
  {
    id: "2",
    nome: "Boteco do Pão",
    imagem: "/images/onde_ir/boteco-do-pao/botecodopao4.jpg",
    endereco: "Morada do Sol",
    categoria: "Bares",
    avaliacao: 4.5,
    bairro: "Morada do Sol",
    descricao: `O Boteco do Pão é uma excelente opção para quem busca um ambiente descontraído, boa música e sabores irresistíveis. Com um cardápio variado, oferece petiscos deliciosos, espetadas suculentas e uma seleção de bebidas que inclui cervejas sempre geladas e drinks especiais.

Ideal para um happy hour, uma reunião entre amigos ou um momento de descontração, o local combina um atendimento cordial com uma atmosfera animada, tornando cada visita especial. Além disso, a música ao vivo garante uma experiência ainda mais agradável.

O que faz do Boteco do Pão um ótimo destino?

  • Gastronomia de qualidade, com pratos e petiscos preparados com ingredientes selecionados

  • Bebidas para todos os gostos, incluindo cervejas artesanais e drinks exclusivos

  • Ambiente acolhedor e animado, perfeito para encontros e celebrações

  • Música ao vivo, para tornar cada momento mais especial

  • Atendimento rápido e eficiente, proporcionando uma experiência agradável

Seja para uma noite animada ou para saborear uma boa comida em um ambiente aconchegante, o Boteco do Pão é um destino que vale a pena conhecer.`,
    telefone: "(64) 99238-2923",
    website: "https://www.dguests.com.br/cardapio/Botecodopao",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "00:00"] },
      { dia: "Terça", horarios: ["11:00", "00:00"] },
      { dia: "Quarta", horarios: ["11:00", "01:00"] },
      { dia: "Quinta", horarios: ["11:00", "02:00"] },
      { dia: "Sexta", horarios: ["11:00", "02:00"] },
      { dia: "Sábado", horarios: ["11:00", "02:00"] },
      { dia: "Domingo", horarios: [] }
    ],
    ultimaAtualizacao: "2025-04-02T12:00:00",
    banner: "/images/onde_ir/boteco-do-pao/botecodopao2.jpg",
    logo: "/images/onde_ir/boteco-do-pao/botecodo-logo.jpg",
    galeria: [
      "/images/onde_ir/boteco-do-pao/botecodopao3.jpg",
      "/images/onde_ir/boteco-do-pao/botecodopao4.jpg",
      "/images/onde_ir/boteco-do-pao/botecodopao5.jpg",
      "/images/onde_ir/boteco-do-pao/botecodopao.jpg"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Aceita Cartão",
      "Música ao Vivo",
      "Jogos de Futebol na TV"
    ],
    latitude: -17.79386,
    longitude: -50.94297
  },
  {
    id: "3",
    nome: "Stur Bier",
    imagem: "/images/onde_ir/stur-bier/stur-banner.png",
    endereco: "R. Tobias do Restaurante QD 07 - LT 09 e 18",
    bairro: "DIMPE",
    categoria: "Música ao Vivo",
    avaliacao: 4.7,
    descricao: `O Pub Perfeito para os Amantes de Rock, Churrasco, Chopp e Hambúrgueres Artesanais!
Se você busca um ambiente aconchegante, familiar e com personalidade, o Stur Bier é o seu lugar! Aqui, fugimos do óbvio e trazemos uma experiência única para quem curte o bom e velho Rock 'n' Roll, acompanhado do melhor churrasco defumado e de um chopp artesanal de qualidade.

Rock na Veia – Nada de modinha! Aqui o som é clássico, autêntico e feito para quem tem alma roqueira.
Churrasco Defumado de Verdade – Cortes suculentos preparados com técnica e paixão.
Chopp Artesanal Gelado – Sabores únicos para acompanhar cada momento.
Ambiente Aconchegante e Familiar – Curta bons momentos com quem você gosta.

Seja para curtir um som, saborear um churrasco impecável ou brindar com um chopp artesanal gelado, o Stur Bier é o pub ideal para quem valoriza qualidade e atitude!

📍 Venha viver essa experiência! `,
    telefone: "(64) 99266-7878",
    website: "https://www.instagram.com/sturbier?igsh=Zjh5ZDJva2JtaTEx",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: [] },
      { dia: "Terça", horarios: [] },
      { dia: "Quarta", horarios: [] },
      { dia: "Quinta", horarios: [] },
      { dia: "Sexta", horarios: ["19:00"] },
      { dia: "Sábado", horarios: ["19:00"] },
      { dia: "Domingo", horarios: [] }
    ],
    ultimaAtualizacao: "2025-04-02T12:23:28",
    banner: "/images/onde_ir/stur-bier/stur-banner.png",
    logo: "/images/onde_ir/stur-bier/stur-logo.png",
    galeria: [
      "/images/onde_ir/stur-bier/stur1.jpeg",
      "/images/onde_ir/stur-bier/stur2.jpeg",
      "/images/onde_ir/stur-bier/stur3.jpeg",
      "/images/onde_ir/stur-bier/stur4.jpeg",
      "/images/onde_ir/stur-bier/stur5.jpeg",
      "/images/onde_ir/stur-bier/stur6.jpeg"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Aceita Cartão",
      "Música ao Vivo"
    ],
    latitude: -17.76016,
    longitude: -50.92811
  },
  {
    id: "4",
    nome: "Galpão da Ultra",
    imagem: "/images/eventos/galpao_ultra/galpaoultra.png",
    endereco: "R. Rafael Nascimento, 417 - Centro",
    bairro: "Centro",
    telefone: "(64) 992154438",
    website: "https://www.instagram.com/galpaodaultra?igsh=aGc1YWttbmhnZ3Fu",
    categoria: "Música ao Vivo",
    avaliacao: 4.7,
    descricao: `O **Galpão Ultra Pub** é o ponto de encontro perfeito para quem ama **rock'n roll**, boa música e um ambiente descontraído para curtir com os amigos. 

Localizado no **coração de Rio Verde**, o pub reúne o melhor da cena musical com bandas ao vivo, cervejas especiais e uma vibe única!

   **O espaço é ideal para quem busca:**

* Diversão garantida
* Drinks especiais
* Chopp sempre gelado
* Repertório variado de **rock clássico**, **alternativo** e **indie**

   **Shows e Música ao Vivo**

* Apresentações todos os fins de semana
* Bandas selecionadas
* O melhor do rock na cidade

`,
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["08:00"] },
      { dia: "Terça", horarios: ["08:00"] },
      { dia: "Quarta", horarios: ["08:00"] },
      { dia: "Quinta", horarios: ["08:00"] },
      { dia: "Sexta", horarios: ["08:00"] },
      { dia: "Sábado", horarios: ["08:00"] },
      { dia: "Domingo", horarios: ["08:00"] }
    ],
    ultimaAtualizacao: "2025-04-02T12:23:28",
    banner: "/images/eventos/galpao_ultra/galpaoultra.png",
    logo: "/images/onde_ir/galpao_ultra/galpaoultra.png",
    galeria: [
      "/images/eventos/galpao_ultra/galpaoultra1.jpg",
      "/images/eventos/galpao_ultra/galpaoultra2.jpg",
      "/images/eventos/galpao_ultra/galpaoultra3.jpeg",
      "/images/eventos/galpao_ultra/galpaoultra4.jpeg",
      "/images/eventos/galpao_ultra/galpaoultra5.jpg"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Aceita Cartão",
      "Música ao Vivo"
    ],
    latitude: -17.79838,
    longitude: -50.93026
  }
  // Adicione outros estabelecimentos aqui
];
