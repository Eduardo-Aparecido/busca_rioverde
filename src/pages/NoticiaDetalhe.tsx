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
    titulo: "Novo café artesanal abre as portas no centro da cidade",
    imagem: "cafe-artesanal.jpg",
    galeria: [
      "cafe-artesanal-1.jpg",
      "cafe-artesanal-2.jpg",
      "cafe-artesanal-3.jpg"
    ],
    resumo: "O Café Artesanal, localizado na rua principal, oferece uma experiência única de café com grãos selecionados e ambiente acolhedor.",
    conteudo: "O Café Artesanal, um novo estabelecimento que promete revolucionar a cena de cafés em Rio Verde, abriu suas portas na última semana. Localizado em um charmoso prédio histórico no coração da cidade, o café oferece uma experiência única para os amantes de café.\n\nO proprietário, João Silva, que tem mais de 10 anos de experiência no ramo, selecionou pessoalmente os melhores grãos de café de diferentes regiões do Brasil. 'Queremos oferecer não apenas um café, mas uma experiência completa', afirma Silva.\n\nO ambiente foi cuidadosamente decorado com móveis vintage e plantas, criando um espaço acolhedor e instagramável. Além dos cafés especiais, o cardápio inclui doces artesanais e salgados frescos, todos preparados na própria cozinha do estabelecimento.\n\nPara celebrar a inauguração, o café está oferecendo 20% de desconto em todos os produtos até o final do mês. Os clientes também podem participar de degustações gratuitas aos sábados, onde podem aprender sobre diferentes métodos de preparo de café.",
    data: "15 Nov 2023",
    autor: "Maria Oliveira",
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
    imagem: "parque-esportes.jpg",
    galeria: [
      "parque-esportes-1.jpg",
      "parque-esportes-2.jpg",
      "parque-esportes-3.jpg"
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
          <span>Notícias</span>
          <span className="mx-2">›</span>
          <span>{noticia.categoria}</span>
        </div>

        {/* Banner Principal */}
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-b-2xl overflow-hidden mb-6 md:mb-8">
          <img
            src={`/images/${noticia.imagem}`}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Status e Data */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-6 md:mb-8">
          <Badge 
            variant="secondary" 
            className="text-sm md:text-lg font-semibold bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 px-3 py-1 md:px-6 md:py-2 w-fit"
          >
            {noticia.categoria}
          </Badge>
          <span className="text-zinc-900 dark:text-zinc-400 text-xs md:text-sm flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {noticia.data}
          </span>
        </div>

        {/* Cabeçalho da Notícia */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 bg-zinc-200 dark:bg-zinc-900 p-3 md:p-4 rounded-lg">
          <Avatar className="w-12 h-12 md:w-16 md:h-16">
            <AvatarImage src={`/images/${noticia.autorImagem}`} alt={noticia.autor} />
            <AvatarFallback>{noticia.autor.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">{noticia.titulo}</h1>
            <p className="text-cyan-600 dark:text-cyan-400 text-sm md:text-base">{noticia.autor}</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg p-3 md:p-4 mb-6 md:mb-8">
          <div className="space-y-4 text-zinc-900 dark:text-zinc-300">
            {noticia.conteudo.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-sm md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {noticia.tags.map((tag) => (
            <div 
              key={tag} 
              className="bg-zinc-200 dark:bg-zinc-900 px-3 py-2 rounded-lg text-xs md:text-sm text-zinc-900 dark:text-zinc-300 flex items-center gap-2"
            >
              #{tag}
            </div>
          ))}
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

        {/* Galeria */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-6">Galeria de Fotos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {noticia.galeria.map((imagem, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => abrirModal(index)}
              >
                <img
                  src={`/images/${imagem}`}
                  alt={`${noticia.titulo} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Localização */}
        <div className="mb-24">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Localização</h2>
          <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg p-3 md:p-4">
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="break-words">{noticia.endereco}</span>
            </div>
            <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
              <Map 
                latitude={noticia.latitude}
                longitude={noticia.longitude}
                title={noticia.titulo}
                description={noticia.endereco}
              />
            </div>
          </div>
        </div>

        {/* Modal de imagem */}
        <ImageModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          imageUrl={`/images/${noticia.galeria[imagemSelecionadaIndex]}`}
          alt={`${noticia.titulo} - Imagem ${imagemSelecionadaIndex + 1}`}
          onNext={proximaImagem}
          onPrevious={imagemAnterior}
          hasNext={imagemSelecionadaIndex < noticia.galeria.length - 1}
          hasPrevious={imagemSelecionadaIndex > 0}
        />
      </div>
    </div>
  );
};

export default NoticiaDetalhe;
