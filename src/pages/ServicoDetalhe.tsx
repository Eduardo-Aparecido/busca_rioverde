/**
 * Importação dos componentes e dependências necessárias
 * - useParams: Hook do React Router para acessar parâmetros da URL
 * - motion: Biblioteca de animações Framer Motion
 * - Componentes UI personalizados
 */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Mail, MapPin, ArrowLeft, MessageCircle } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ImageGallery } from "@/components/ui/image-gallery";

/**
 * Dados simulados para desenvolvimento
 */
const servicos = [
  {
    id: "1",
    titulo: "Faxineira",
    imagem: "/images/servicos/faxineira_01.jpg",
    galeriaFotos: [
      "/images/servicos/faxineira_02.jpg",
      "/images/servicos/faxineira_03.jpg"
    ],
    categoria: "Serviços Domésticos",
    descricao: "Serviços de faxina residencial e comercial. Atendimento personalizado e profissional. Experiência com diferentes tipos de ambientes e superfícies.",
    avaliacao: 4.8,
    avaliacoes: 156,
    preco: "A partir de R$ 100",
    contato: {
      nome: "Gertrudes",
      telefone: "(64) 99999-9999",
      email: "gertrudes.faxineira@email.com",
      endereco: "Centro, Rio Verde - GO"
    },
    servicos: [
      "Faxina residencial",
      "Faxina comercial",
      "Faxina de escritórios",
      "Faxina de lojas",
      "Faxina de hotéis",
      "Faxina de igrejas"
    ]
  },
  {
    id: "2",
    titulo: "Dj Para Festas",
    imagem: "/images/servicos/dj.jpg",
    galeriaFotos: [
      "/images/servicos/dj_01.jpg",
      "/images/servicos/dj_02.jpg",
      "/images/servicos/dj_03.jpg",
      "/images/servicos/dj_04.jpg"
    ],
    categoria: "Entretenimento",
    descricao: "Dj para festas. A pessoa certa para animar o seu evento",
    avaliacao: 4.9,
    avaliacoes: 203,
    preco: "A partir de R$ 350",
    contato: {
      nome: "João Silva",
      telefone: "(64) 98888-8888",
      email: "joao.dj@email.com",
      endereco: "Setor Morada do Sol, Rio Verde - GO"
    },
    servicos: [
      "Dj para festas"
    ]
  },
  {
    id: "3",
    titulo: "Pintura",
    imagem: "/images/servicos/pintor_01.jpg",
    galeriaFotos: [
      "/images/servicos/pintor_02.jpg"
    ],
    categoria: "Serviços de Construção",
    descricao: "Pintura de paredes e tetos. Atendimento personalizado e profissional. Experiência com diferentes tipos de ambientes e superfícies.",
    avaliacao: 4.9,
    avaliacoes: 203,
    preco: "A partir de R$ 150",
    contato: {
      nome: "João Silva",
      telefone: "(64) 98888-8888",
      email: "joao.pintor@email.com",
      endereco: "Setor Morada do Sol, Rio Verde - GO"
    },
    servicos: [
      "Pintura de paredes",
      "Pintura de tetos",
      "Pintura de portões",
      "Pintura de portões",
      "Pintura de portões",
      "Pintura de portões"
    ]
  }
];

/**
 * Página ServicoDetalhe
 * 
 * Exibe os detalhes completos de um serviço
 * Permite contato direto com o prestador
 */
const ServicoDetalhe = () => {
  const { id } = useParams();
  useScrollToTop();
  const servico = servicos.find(s => s.id === id);

  if (!servico) {
    return <div>Serviço não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="fixed inset-0 bg-black -z-10" />
      <div className="w-full px-0 sm:w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] mx-auto py-8">
        <div className="bg-white dark:bg-black rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* Conteúdo Principal */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna da Esquerda - Imagens e Informações */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Imagem Principal */}
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={servico.imagem}
                      alt={servico.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Título e Preço */}
                  <div className="mt-6">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {servico.titulo}
                    </h1>
                    <div className="text-3xl font-bold text-primary mt-2">
                      {servico.preco}
                    </div>
                  </div>

                  {/* Avaliação */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{servico.avaliacao}</span>
                    </div>
                    <span className="text-sm text-zinc-500">({servico.avaliacoes} avaliações)</span>
                  </div>

                  {/* Descrição */}
                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
                      Sobre o serviço
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                      {servico.descricao}
                    </p>
                  </div>

                  {/* Lista de serviços */}
                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
                      Serviços oferecidos
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {servico.servicos.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Galeria de Imagens */}
                <section className="mt-12">
                  <ImageGallery 
                    images={servico.galeriaFotos}
                    title="Galeria de Imagens"
                  />
                </section>
              </div>

              {/* Coluna da Direita - Informações de Contato */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 sticky top-24">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-6">
                      Informações de contato
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Profissional:
                      </p>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {servico.contato.nome}
                      </p>

                      {/* Telefone */}
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {servico.contato.telefone}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {servico.contato.email}
                        </span>
                      </div>

                      {/* Endereço */}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {servico.contato.endereco}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicoDetalhe; 