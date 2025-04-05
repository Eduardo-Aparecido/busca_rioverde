import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ArrowLeft,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ImageModal } from "@/components/ui/image-modal";
import { Map } from "@/components/ui/map";
import { ImageGallery } from "@/components/ui/image-gallery";
import ReactMarkdown from 'react-markdown';

// Interface para a estrutura de uma notícia
interface Noticia {
  id: string;
  titulo: string;
  imagem: string;
  galeria: string[];
  resumo: string;
  conteudo: string;
  data: string;
  autor: string;
  autorImagem: string;
  categoria: string;
  tags: string[];
  endereco: string;
  latitude: number;
  longitude: number;
}

// Dados simulados para desenvolvimento
const noticias: Noticia[] = [
  {
    id: "1",
    titulo: "Novo Hosp. Municipal Universitário",
    imagem: "/images/noticias/hmurv1.jpg",
    galeria: [
      "/images/noticias/hmurv2.jpg",
      "/images/noticias/hmurv3.jpg",
      "/images/noticias/hmurv4.jpg",
      "/images/noticias/hmurv5.jpg"
    ],
    resumo: "teste",
    conteudo: `A Prefeitura de Rio Verde inaugurou a primeira fase do Hospital Municipal Universitário (HMU), um marco para a saúde e a formação médica em Goiás!

**Investimento e Dimensão:**
*   R$ 128 milhões em recursos municipais
*   Maior hospital municipal do estado
*   25 mil m² de área construída

**Destaques da estrutura:**
* ✅ 275 leitos de enfermaria + 36 de UTI
* ✅ Pronto-socorro com 15 leitos de observação
* ✅ Centro cirúrgico com tecnologia robótica
* ✅ Laboratórios, diagnóstico por imagem e ensino médico
* ✅ Heliporto para emergências

Com 25 mil m² de área construída, o HMU melhora o atendimento na região e fortalece a formação de novos médicos!`,
    data: "15 Nov 2023",
    autor: "Eduardo Aparecido",
    autorImagem: "avatar-maria.jpg",
    categoria: "Gastronomia",
    tags: ["café", "gastronomia", "inauguração"],
    endereco: "Rua Principal, 123 - Centro",
    latitude: -17.79942422405687,
    longitude: -50.93200656856998
  },
  {
    id: "2",
    titulo: "Parque da cidade recebe novo espaço para esportes",
    imagem: "/images/noticias/parque-esportes.jpg",
    galeria: [
      "/images/noticias/parque-esportes-1.jpg",
      "/images/noticias/parque-esportes-2.jpg",
      "/images/noticias/parque-esportes-3.jpg"
    ],
    resumo: "O Parque Municipal foi revitalizado e agora conta com novas quadras esportivas, pista de skate e academia ao ar livre.",
    conteudo: "O Parque Municipal de Rio Verde acaba de receber uma importante revitalização, com foco especial em novos espaços para a prática de esportes. O projeto, que levou seis meses para ser concluído, incluiu a construção de três novas quadras poliesportivas, uma pista de skate profissional e uma academia ao ar livre completa.\n\nSegundo a Secretaria de Esportes e Lazer, o investimento de R$ 1,2 milhão visa promover a saúde e o bem-estar da população, além de fomentar a prática esportiva entre crianças e jovens. As novas instalações contam com iluminação de LED, permitindo o uso noturno, e sistemas de drenagem eficientes para evitar alagamentos em períodos chuvosos.\n\n'Estamos muito felizes em entregar esse espaço renovado para a população. O parque sempre foi um ponto de encontro importante para as famílias, e agora oferece ainda mais opções de lazer e esporte para todas as idades', declarou o secretário de Esportes, Roberto Santos.\n\nA inauguração oficial acontecerá no próximo sábado, com uma programação especial que inclui torneios esportivos, apresentações de skatistas profissionais e aulas abertas de diversas modalidades.",
    data: "20 Nov 2023",
    autor: "Carlos Mendes",
    autorImagem: "avatar-carlos.jpg",
    categoria: "Esportes",
    tags: ["parque", "esportes", "lazer"],
    endereco: "Av. dos Esportes, 456 - Setor Olímpico",
    latitude: -17.80142422405687,
    longitude: -50.93400656856998
  }
];

const NoticiaDetalhe = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemSelecionadaIndex, setImagemSelecionadaIndex] = useState(0);
  
  useEffect(() => {
    setTimeout(() => {
      const noticiaEncontrada = noticias.find(n => n.id === id);
      setNoticia(noticiaEncontrada || null);
      setCarregando(false);
    }, 300);
  }, [id]);

  const abrirModal = (index: number) => {
    setImagemSelecionadaIndex(index);
    setModalAberto(true);
  };

  const proximaImagem = () => {
    if (noticia && imagemSelecionadaIndex < noticia.galeria.length - 1) {
      setImagemSelecionadaIndex(prev => prev + 1);
    }
  };

  const imagemAnterior = () => {
    if (imagemSelecionadaIndex > 0) {
      setImagemSelecionadaIndex(prev => prev - 1);
    }
  };

  // Adicione o componente estilizado para parágrafos
  const StyledParagraph = ({ children }) => (
    <p className="text-zinc-800 dark:text-zinc-300 mb-4">{children}</p>
  );

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Notícia não encontrada</h2>
        <p className="mb-8">A notícia que você está procurando não existe ou foi removida.</p>
        <Link to="/novidades">
          <Button>Voltar para novidades</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="fixed inset-0 bg-black -z-10" />
      <div className="w-full px-0 sm:w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] mx-auto py-8">
        <div className="bg-white dark:bg-black rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* Banner */}
          <div className="w-full h-[250px] sm:h-[400px] overflow-hidden">
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-8 py-6">
            {/* Categoria e Data */}
            <div className="flex justify-between items-center mb-6">
              <Badge 
                variant="secondary" 
                className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300"
              >
                {noticia.categoria}
              </Badge>
              <span className="text-zinc-600 dark:text-zinc-400 text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {noticia.data}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
              {noticia.titulo}
            </h1>

            {/* Autor */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`/images/${noticia.autorImagem}`} alt={noticia.autor} />
                <AvatarFallback>{noticia.autor.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-zinc-900 dark:text-white font-medium">{noticia.autor}</p>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="mt-6">
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    p: StyledParagraph,
                    strong: ({ children }) => (
                      <span className="font-bold">{children}</span>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        className="text-primary hover:underline"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-4 space-y-2 mb-4">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-zinc-800 dark:text-zinc-300">{children}</li>
                    )
                  }}
                >
                  {noticia.conteudo}
                </ReactMarkdown>
              </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

            {/* Galeria */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Galeria</h2>
              <ImageGallery 
                images={noticia.galeria}
                title={noticia.titulo}
              />
            </div>

            {/* Localização */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Localização</h2>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
                <div className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400 mb-4">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>{noticia.endereco}</span>
                </div>
                <div className="h-[400px] w-full rounded-lg overflow-hidden">
                  <Map 
                    latitude={noticia.latitude}
                    longitude={noticia.longitude}
                    title={noticia.titulo}
                    description={noticia.endereco}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de imagem */}
      <ImageModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        imageUrl={noticia.galeria[imagemSelecionadaIndex]}
        alt={`${noticia.titulo} - Imagem ${imagemSelecionadaIndex + 1}`}
        onNext={proximaImagem}
        onPrevious={imagemAnterior}
        hasNext={imagemSelecionadaIndex < noticia.galeria.length - 1}
        hasPrevious={imagemSelecionadaIndex > 0}
      />
    </div>
  );
};

export default NoticiaDetalhe;
