import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ImageModal } from "@/components/ui/image-modal";
import { Map } from "@/components/ui/map";
import { ImageGallery } from "@/components/ui/image-gallery";
import ReactMarkdown from 'react-markdown';
import { useNoticias, Noticia } from "@/data/NoticiaContext";

const NoticiaDetalhe = () => {
  const { id } = useParams();
  const { noticias, loadingNoticias } = useNoticias(); // ✅ Pegando o estado de loading
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemSelecionadaIndex, setImagemSelecionadaIndex] = useState(0);

  useEffect(() => {
    if (loadingNoticias) return; // ✅ Aguarda o carregamento global

    const noticiaEncontrada = noticias.find(n => n.id === id);
    if (noticiaEncontrada) {
      setNoticia(noticiaEncontrada);
    }

    setCarregando(false);
  }, [id, noticias, loadingNoticias]);

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

  const StyledParagraph = ({ children }) => (
    <p className="text-zinc-800 dark:text-zinc-300 mb-4">{children}</p>
  );

  // ✅ Mostra spinner enquanto carrega tudo
  if (carregando || loadingNoticias) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // ✅ Só mostra mensagem de erro se já carregou tudo e não encontrou a notícia
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
          <div className="w-full h-[250px] sm:h-[400px] overflow-hidden">
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-6">
              <Badge 
                variant="secondary" 
                className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300"
              >
                {noticia.categoria}
              </Badge>
              <span className="text-zinc-600 dark:text-zinc-400 text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(noticia.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
              {noticia.titulo}
            </h1>

            <div className="flex items-center gap-4 mb-8 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`/images/${noticia.autorImagem}`} alt={noticia.autor} />
                <AvatarFallback>{noticia.autor.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-zinc-900 dark:text-white font-medium">{noticia.autor}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    p: StyledParagraph,
                    strong: ({ children }) => <span className="font-bold">{children}</span>,
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
                    ul: ({ children }) => <ul className="list-disc pl-4 space-y-2 mb-4">{children}</ul>,
                    li: ({ children }) => <li className="text-zinc-800 dark:text-zinc-300">{children}</li>
                  }}
                >
                  {noticia.conteudo}
                </ReactMarkdown>
              </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Galeria</h2>
              <ImageGallery 
                images={noticia.galeria}
                title={noticia.titulo}
                onImageClick={abrirModal}
              />
            </div>

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

      {noticia.galeria.length > 0 && (
        <ImageModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          imageUrl={noticia.galeria[imagemSelecionadaIndex]?.url}
          alt={`${noticia.titulo} - Imagem ${imagemSelecionadaIndex + 1}`}
          onNext={proximaImagem}
          onPrevious={imagemAnterior}
          hasNext={imagemSelecionadaIndex < noticia.galeria.length - 1}
          hasPrevious={imagemSelecionadaIndex > 0}
        />
      )}
    </div>
  );
};

export default NoticiaDetalhe;
