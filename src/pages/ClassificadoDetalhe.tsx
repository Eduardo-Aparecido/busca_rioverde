/**
 * Importação dos componentes e dependências necessárias
 * - useParams: Hook do React Router para acessar parâmetros da URL
 * - motion: Biblioteca de animações Framer Motion
 * - Componentes UI personalizados
 */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, MessageSquare, ArrowLeft } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/ui/image-gallery";

/**
 * Dados simulados para desenvolvimento
 */
const classificados = [
  {
    id: "1",
    titulo: "iPhone 13 Pro Max",
    imagem: "/images/classificados/iphone13promax_04.jpg",
    galeriaFotos: [
      "/images/classificados/iphone13promax.jpg",
      "/images/classificados/iphone13promax_02.jpg",
      "/images/classificados/iphone13promax_03.jpg",
      "/images/classificados/iphone13promax_04.jpg"
    ],
    preco: "R$ 4.999,00",
    categoria: "Eletrônicos",
    descricao: `iPhone 13 Pro Max 128GB grafite, em ótimo estado, com carregador original (sem caixa).
                Saúde da bateria em 89%, sempre usado com capa e película.
                Aparelho funcionando perfeitamente, sem marcas de uso.`,
    data: "28 Mar 2025",
    contato: {
      telefone: "(64) 99999-9999",
      whatsapp: "(64) 99999-9999",
      email: "contato@email.com"
    },
    detalhes: [
      { label: "Modelo", valor: "iPhone 13 Pro Max" },
      { label: "Cor", valor: "Grafite" },
      { label: "Memória", valor: "128GB" },
      { label: "Estado", valor: "Ótimo" }
    ]
  },
  {
    id: "2",
    titulo: "Bicicleta Aro 29 KRW",
    imagem: "/images/classificados/bicicleta_01.jpg",
    galeriaFotos: [
      "/images/classificados/bicicleta_01.jpg",
      "/images/classificados/bicicleta_02.jpg"
    ],
    preco: "R$ 200,00",
    categoria: "Esportes",
    descricao: "Bicicleta Alumínio Câmbios Shimano 21 Velocidades Freio a Disco Suspensão Mountain Bike S21",
    data: "28 Mar 2025",
    contato: {
      telefone: "(64) 98888-8888",
      whatsapp: "(64) 98888-8888",
      email: "vendas@email.com"
    },
    detalhes: [
      { label: "Modelo", valor: "Aro 29 KRW" },
      { label: "Cor", valor: "Branca" },
      { label: "Material", valor: "Alumínio" },
      { label: "Câmbio", valor: "Shimano 21 Velocidades" }
    ]
  },
  {
    id: "3",
    titulo: "Guitarra Michael GM222N ST STONEHENGE",
    imagem: "/images/classificados/guitarra.jpg",
    galeriaFotos: [
      "/images/classificados/guitarra_01.jpg",
      "/images/classificados/guitarra_02.jpg"
    ],
    preco: "R$ 1.200,00",
    categoria: "Instrumentos",
    descricao: "Guitarra Michael GM222N ST STONEHENGE",
    data: "28 Mar 2025",
    contato: {
      telefone: "(64) 98888-8888",
      whatsapp: "(64) 98888-8888",
      email: "vendas@email.com"
    },
    detalhes: [
      { label: "Modelo", valor: "Michael GM222N ST STONEHENGE" },
      { label: "Cor", valor: "Verde" },
      { label: "Material", valor: "Madeira" },
      { label: "Tipo", valor: "Elétrica" }
    ]
  }
];

/**
 * Página ClassificadoDetalhe
 * 
 * Exibe os detalhes completos de um classificado
 * Permite contato direto com o anunciante
 */
const ClassificadoDetalhe = () => {
  const { id } = useParams();
  useScrollToTop();
  const classificado = classificados.find(c => c.id === id);

  if (!classificado) {
    return <div>Classificado não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-black">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        {/* Breadcrumb */}
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          <span>Classificados</span>
          <span className="mx-2">›</span>
          <span>{classificado.categoria}</span>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda - Imagem e detalhes */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Imagem */}
              <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={classificado.imagem}
                  alt={classificado.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Título e preço */}
              <div className="mt-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {classificado.titulo}
                </h1>
                <div className="text-3xl font-bold text-primary mt-2">
                  {classificado.preco}
                </div>
              </div>

              {/* Data */}
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 mt-4">
                <Calendar className="h-4 w-4" />
                <span>Publicado em {classificado.data}</span>
              </div>

              {/* Detalhes específicos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {classificado.detalhes.map((detalhe, index) => (
                  <div key={index} className="bg-white dark:bg-zinc-900 p-4 rounded-lg">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {detalhe.label}
                    </div>
                    <div className="text-lg font-medium text-zinc-900 dark:text-white">
                      {detalhe.valor}
                    </div>
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
                  Descrição
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                  {classificado.descricao}
                </p>
              </div>
            </motion.div>

            {/* Galeria de Imagens */}
            <section className="mt-12">
              <ImageGallery 
                images={classificado.galeriaFotos}
                title="Galeria de Imagens"
              />
            </section>
          </div>

          {/* Coluna da direita - Informações de contato */}
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
                  {/* Telefone */}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <a href={`tel:${classificado.contato.telefone}`}>
                      <Phone className="h-4 w-4" />
                      {classificado.contato.telefone}
                    </a>
                  </Button>

                  {/* WhatsApp */}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <Button variant="outline" className="w-full" onClick={() => window.open(`https://wa.me/${classificado.contato.whatsapp.replace(/\D/g, '')}`, '_blank')}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </Button>

                  {/* Email */}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <a href={`mailto:${classificado.contato.email}`}>
                      <Mail className="h-4 w-4" />
                      {classificado.contato.email}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificadoDetalhe; 