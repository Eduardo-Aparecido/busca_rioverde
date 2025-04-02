export interface Local {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  bairro: string;
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
    bairro: "Centro",
    descricao: `Se você busca um restaurante por quilo que une sabor, qualidade e bem-estar, o Finnegans Gastronomia é a escolha certa! Desde 2019, este espaço vem conquistando clientes com um buffet variado, repleto de saladas frescas, pratos quentes e uma seleção de proteínas preparadas com ingredientes de alta qualidade. A tradição familiar na gastronomia atravessa gerações e se reflete em cada detalhe, garantindo uma experiência única a cada refeição.
Além do almoço impecável, as noites no Finnegans são marcadas por um ambiente descontraído e sofisticado. O bar oferece uma carta de drinks exclusivos, cervejas artesanais e petiscos preparados com excelência, tornando cada visita uma experiência especial. Seja para um happy hour, um jantar ou uma comemoração, o Finnegans proporciona o equilíbrio perfeito entre sofisticação e descontração.

Se você deseja realizar um evento inesquecível, o Finnegans Gastronomia também é a escolha ideal. O espaço conta com infraestrutura climatizada e aconchegante para aniversários, eventos empresariais e celebrações especiais, garantindo conforto e qualidade para você e seus convidados.`,
    endereco: "Rua Rafael Nascimento, 219 - Centro",
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
    ultimaAtualizacao: "2025-04-02T14:30:00", // Formato: YYYY-MM-DDThh:mm:ss (exemplo: 2025-04-02T14:30:00)
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
      "/images/onde_ir/finnegans/finnegans.png"
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
    descricao: `O Boteco do Pão é uma excelente opção para quem busca um ambiente descontraído, boa música e sabores irresistíveis. Com um cardápio variado, oferece petiscos deliciosos, espetadas suculentas e uma seleção de bebidas que inclui cervejas sempre geladas e drinks especiais.

Ideal para um happy hour, uma reunião entre amigos ou um momento de descontração, o local combina um atendimento cordial com uma atmosfera animada, tornando cada visita especial. Além disso, a música ao vivo garante uma experiência ainda mais agradável.

O que faz do Boteco do Pão um ótimo destino?

  • Gastronomia de qualidade, com pratos e petiscos preparados com ingredientes selecionados

  • Bebidas para todos os gostos, incluindo cervejas artesanais e drinks exclusivos

  • Ambiente acolhedor e animado, perfeito para encontros e celebrações

  • Música ao vivo, para tornar cada momento mais especial

  • Atendimento rápido e eficiente, proporcionando uma experiência agradável

Seja para uma noite animada ou para saborear uma boa comida em um ambiente aconchegante, o Boteco do Pão é um destino que vale a pena conhecer.`,
    endereco: "Av. José Valter, Quadra 46 - Lote 04 e 05",
    bairro: "Morada do Sol",
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
    avaliacao: 4.7,
    avaliacoes: 256,
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
  }
]; 