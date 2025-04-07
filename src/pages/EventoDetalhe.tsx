/**
 * Importação dos componentes e dependências necessárias
 * - Hooks do React e React Router
 * - motion: Biblioteca de animações Framer Motion
 * - Ícones do Lucide
 * - Componentes UI personalizados
 * - Hooks personalizados para curtidas e comentários
 */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  ArrowLeft,
  Ticket,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
  Pencil,
  Globe,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GaleriaModal } from "@/components/ui/galeria-modal";
import { useCurtida } from "@/hooks/useCurtida";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Map } from "@/components/ui/map";
import { useAuth } from "@/hooks/useAuth";
import { formatEventBadge } from "@/lib/utils/formatEventBadge";
import ReactMarkdown from 'react-markdown';

/**
 * Dados simulados para desenvolvimento
 * Estruturas de dados que simulam o conteúdo que viria de uma API
 */

/**
 * Lista de eventos
 * Array de objetos contendo informações detalhadas sobre os eventos
 * @property id - Identificador único do evento
 * @property titulo - Nome do evento
 * @property imagem - URL da imagem principal
 * @property galeria - Array de URLs das imagens da galeria
 * @property data - Data do evento
 * @property hora - Horário do evento
 * @property local - Local onde será realizado
 * @property categoria - Tipo do evento
 * @property descricao - Descrição detalhada do evento
 * @property ingressos - Informações sobre preços e tipos de ingressos
 * @property avaliacao - Nota média do evento (0-5)
 */
const eventos = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    galeria: [
      { url: "/images/eventos/carol_delgado/caroldelgado_01.jpeg", descricao: "Carol Delgado no palco" },
      { url: "/images/eventos/carol_delgado/caroldelgado_02.jpeg", descricao: "Momentos de risada com Carol" }
    ] as ImagemGaleria[],
    data: "25 de Jan 2024",
    hora: "20:30",
    local: "The New Coffee Shop",
    categoria: "Comédia Stand-Up",
    descricao: "Carol Delgado apresenta seu novo show 'Love is Magic', uma noite especial com muito humor e diversão.",
    ingressos: "R$ 60,00 (meia solidária) / R$ 160,00 (4 lugares) / R$ 100,00 (ingresso duplo)",
    avaliacao: 4.7,
    latitude: -17.79942422405687,
    longitude: -50.93200656856998,
    endereco: "Rua Rafael Nascimento, 219 - Centro"
  },
  {
    id: "2",
    titulo: "Banda Rocco",
    imagem: "/images/eventos/banda_rocco/bandarocco_01.jpeg",
    galeria: [
      "/images/eventos/banda_rocco/bandarocco_02.jpeg",
      "/images/eventos/banda_rocco/bandarocco_03.jpeg",
      "/images/eventos/banda_rocco/bandarocco_04.jpeg"
    ],
    data: "12 Abr 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Musica",
    descricao: "Banda da cidade de Goiânia que vem conquistando seu espaço no cenário do metal nacional.",
    ingressos: "R$ 25,00",
    avaliacao: 4.8,
    latitude: -17.79942422405687,
    longitude: -50.93200656856998,
    endereco: "Rua Rafael Nascimento, 219 - Centro"
  },
  {
    id: "3",
    titulo: "4° EDIÇÃO CAFÉ COM DEUS | ENCONTRO COM MULHERES | POR FERNANDA XIMENES",
    imagem: "/images/eventos/cafe_com_deus/cafecomdeus.jpeg",
    galeria: [
      "/images/eventos/cafe_com_deus/cafecomdeus_02.jpeg",
      "/images/eventos/cafe_com_deus/cafecomdeus_03.jpeg",
      "/images/eventos/cafe_com_deus/cafecomdeus_04.jpeg",
    ],
    data: "12 Abr 2025",
    hora: "16:30",
    local: "Rua Costa Gomes, 855, CENTRO, Jardim Goias",
    categoria: "Espiritualidade",
    descricao: "O Café com Deus é mais do que um encontro, é um momento de renovação para mulheres que desejam se conectar profundamente com Deus ,em um ambiente acolhedor e inspirador. Compartilhamos da palavra, testemunhos, reflexões e louvores. Cada detalhe é pensado para fortalecer a fé, restaurar corações e reafirmar a identidade em Cristo. Mais do que um evento, é um chamado para mulheres que querem viver seu propósito com coragem, leveza e plenitude.",
    ingressos: " ",
    avaliacao: 4.8,
    latitude: -17.79942422405687,
    longitude: -50.93200656856998,
    endereco: "Rua Costa Gomes, 855, CENTRO, Jardim Goias"
  },
  {
    id: "4",
    titulo: "Galpão da Ultra Pub",
    imagem: "/images/eventos/galpao_ultra/galpaoultra.png",
    galeria: [
      "/images/eventos/galpao_ultra/galpaoultra1.jpg",
      "/images/eventos/galpao_ultra/galpaoultra2.jpg",
      "/images/eventos/galpao_ultra/galpaoultra3.jpeg",
      "/images/eventos/galpao_ultra/galpaoultra4.jpeg",
      "/images/eventos/galpao_ultra/galpaoultra5.jpg"
    ],
    data: "26 Abr 2025",
    hora: "22:00",
    local: "Centro",
    categoria: "Música",
    website: "instagram.com/galpaoultrapub",
    telefone: "556492481159",
    descricao: ` Uma noite épica de nostalgia e muita energia te espera!

Prepare-se para curtir dois super shows que vão agitar o Galpão Ultra Pub:

 [@ladohostil](https://www.instagram.com/ladohostil/) trazendo os grandes sucessos de Charlie Brown Jr. e O Rappa

 [@oscreusebecks](https://www.instagram.com/oscreusebecks/) com toda a irreverência e diversão dos Mamonas Assassinas
  

Reúna a galera, garanta sua presença e venha viver essa experiência única!
* 

`,
    ingressos: " ",
    avaliacao: 4.8,
    latitude: -17.79838,
    longitude: -50.93026,
    endereco: "Rua Rafael Nascimento, 417 - Centro"
  }
];

interface ImagemGaleria {
  url: string;
  descricao?: string;
}

/**
 * Página EventoDetalhe
 * 
 * Página de detalhes de um evento específico
 * Exibe informações completas e permite interação com o evento
 * 
 * Características:
 * - Banner principal com imagem do evento
 * - Informações básicas (data, hora, local)
 * - Descrição detalhada
 * - Galeria de imagens com modal
 * - Sistema de curtidas
 * - Sistema de comentários
 * - Design responsivo
 * - Tema claro/escuro
 * 
 * Estados:
 * - carregando: Controla o estado de carregamento
 * - modalAberto: Controla a exibição do modal da galeria
 * - imagemAtual: Índice da imagem atual na galeria
 * - imagemPrincipal: URL da imagem principal selecionada
 * - comentario: Texto do novo comentário
 * - comentarios: Lista de comentários do evento
 */
const EventoDetalhe = () => {
  const { id } = useParams();
  const { user } = useAuth();
  useScrollToTop();
  const evento = eventos.find(e => e.id === id);

  // Estados para controle da página
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  
  // Hook para gerenciar curtidas
  const { curtido, contagemCurtidas, handleCurtir } = useCurtida({ 
    itemId: id || '', 
    tipo: 'evento' 
  });
  
  /**
   * Efeito para rolar a página para o topo ao carregar
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  /**
   * Efeito para simular carregamento dos dados
   * Define o estado de carregamento como falso após um delay
   */
  useEffect(() => {
    if (!evento) return;
    
    setTimeout(() => {
      setCarregando(false);
    }, 300);
  }, [evento]);

  /**
   * Manipula o envio de um novo comentário
   * TODO: Implementar integração com backend
   */
  const handleEnviarComentario = () => {
    // Implemente a lógica para enviar o comentário
  };

  const abrirModal = (index: number) => {
    setImagemAtual(index);
    setModalAberto(true);
  };

  const proximaImagem = () => {
    if (evento && imagemAtual < evento.galeria.length - 1) {
      setImagemAtual(prev => prev + 1);
    }
  };

  const imagemAnterior = () => {
    if (imagemAtual > 0) {
      setImagemAtual(prev => prev - 1);
    }
  };

  if (!evento) {
    return (
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Evento não encontrado</h1>
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </div>
      </div>
    );
  }

  // Verifica se o evento tem localização
  const temLocalizacao = evento.latitude && 
    typeof evento.latitude === 'number' && 
    typeof evento.longitude === 'number' && 
    evento.endereco;

  // Primeiro, vamos criar um componente para o parágrafo estilizado
  const StyledParagraph = ({ children }) => (
    <p className="text-zinc-800 dark:text-zinc-300 mb-4">{children}</p>
  );

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="w-full px-0 sm:w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] mx-auto py-8">
        <div className="bg-white dark:bg-black rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* Banner */}
          <div className="w-full h-[250px] sm:h-[400px] overflow-hidden">
            <img
              src={evento.imagem}
              alt={evento.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badges */}
          <div className="flex justify-between items-center px-4 py-2">
            <Badge className="bg-red-500 hover:bg-red-500 text-white">
              {evento.data} ÀS {evento.hora}
            </Badge>
              <Badge className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
              Atualizado em {new Date().toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
              </Badge>
          </div>

          <div className="p-6">
            {/* Informações Principais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                {/* Cabeçalho */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{evento.titulo}</h1>
                  <span className="text-cyan-500">{evento.local}</span>
                </div>

                {/* Descrição */}
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
                      {evento.descricao}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Divisor 1 */}
                    <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800" />

                {/* Galeria */}
                <div className="mt-8">
                      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Galeria de Imagens</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {evento.galeria.map((imagem, index) => (
                          <div
                            key={index}
                            className="aspect-[3/4] cursor-pointer bg-black rounded-xl overflow-hidden"
                            onClick={() => {
                              setImagemAtual(index);
                              setModalAberto(true);
                            }}
                          >
                            <img
                          src={typeof imagem === 'string' ? imagem : imagem.url}
                          alt={typeof imagem === 'string' ? `Imagem ${index + 1}` : imagem.descricao || `Imagem ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                {/* Divisor para Links */}
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800" />

                {/* Links de Contato */}
                {(evento.website || evento.telefone) && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Contatos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {evento.website && (
                        <a 
                          href={`https://${evento.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                          <span>Link do local</span>
                        </a>
                      )}
                      {evento.telefone && (
                        <a 
                          href={`https://wa.me/${evento.telefone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-colors"
                        >
                          <Phone className="h-5 w-5" />
                          <span>Contato</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Divisor 2 */}
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800" />

                {/* Localização */}
                {temLocalizacao && (
                  <div className="mt-8">
                      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Localização</h2>
                    <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-400 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{evento.endereco}</span>
                    </div>
                    <div className="w-full h-[400px] rounded-lg overflow-hidden">
                      <Map
                        latitude={evento.latitude}
                        longitude={evento.longitude}
                        title={evento.titulo}
                        description={evento.endereco}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
        </div>
      </div>

      {/* Modal da Galeria */}
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent className="max-w-5xl p-0 bg-black border-0">
            <div className="relative flex items-center justify-center bg-black">
              {/* Botão Fechar */}
              <button
                onClick={() => setModalAberto(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Botão Anterior */}
              {imagemAtual > 0 && (
                <button
                  onClick={() => setImagemAtual(prev => prev - 1)}
                  className="absolute left-4 z-50 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              )}

              {/* Imagem */}
              <div className="w-full h-[80vh] flex items-center justify-center p-4">
                <img
                  src={typeof evento.galeria[imagemAtual] === 'string' 
                    ? evento.galeria[imagemAtual] 
                    : evento.galeria[imagemAtual].url}
                  alt={typeof evento.galeria[imagemAtual] === 'string'
                    ? `Imagem ${imagemAtual + 1}`
                    : evento.galeria[imagemAtual].descricao || `Imagem ${imagemAtual + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Botão Próximo */}
              {imagemAtual < evento.galeria.length - 1 && (
                <button
                  onClick={() => setImagemAtual(prev => prev + 1)}
                  className="absolute right-4 z-50 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              )}

              {/* Descrição da Imagem */}
              {typeof evento.galeria[imagemAtual] !== 'string' && evento.galeria[imagemAtual].descricao && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm">
                    {evento.galeria[imagemAtual].descricao}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventoDetalhe;