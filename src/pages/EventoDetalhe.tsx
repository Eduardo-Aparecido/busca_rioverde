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
  Share2, 
  ArrowLeft,
  Ticket,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GaleriaModal } from "@/components/ui/galeria-modal";
import { useCurtida } from "@/hooks/useCurtida";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
    avaliacao: 4.7
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
    avaliacao: 4.8
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
    avaliacao: 4.8
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
  // Obtém o ID do evento da URL
  const { id } = useParams<{ id: string }>();

  // Estados para controle da página
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState<ImagemGaleria | null>(null);
  
  // Busca o evento pelo ID
  const evento = eventos.find(e => e.id === id);
  
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

  // Retorna mensagem se o evento não for encontrado
  if (!evento) {
    return <div>Evento não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-secondary/50 dark:bg-black pt-16 md:pt-0">
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Voltar
        </Button>
      </div>

      {/* Imagem Principal */}
      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <img
            src={evento.imagem}
            alt={evento.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold">{evento.titulo}</h1>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>{evento.data}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Clock className="h-4 w-4" />
                  <span>{evento.hora}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span>{evento.local}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Sobre o Evento</h2>
              <p>{evento.descricao}</p>
            </div>
          </div>

          {/* Galeria */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {evento.galeria.map((imagem, index) => (
                <button
                  key={index}
                  onClick={() => abrirModal(index)}
                  className="aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={imagem.url}
                    alt={imagem.descricao || `Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Modal da Galeria */}
          <Dialog open={modalAberto} onOpenChange={setModalAberto}>
            <DialogContent className="max-w-5xl p-0">
              <div className="relative flex items-center bg-zinc-900">
                {/* Botão Fechar */}
                <button
                  onClick={() => setModalAberto(false)}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
                >
                  <X className="h-5 w-5 text-zinc-100" />
                </button>

                {/* Botão Anterior */}
                {imagemAtual > 0 && (
                  <button
                    onClick={imagemAnterior}
                    className="absolute left-4 z-50 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-zinc-100" />
                  </button>
                )}

                {/* Imagem */}
                <div className="w-full h-[80vh] flex items-center justify-center p-4">
                  <img
                    src={evento.galeria[imagemAtual].url}
                    alt={evento.galeria[imagemAtual].descricao || `Imagem ${imagemAtual + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Botão Próximo */}
                {imagemAtual < evento.galeria.length - 1 && (
                  <button
                    onClick={proximaImagem}
                    className="absolute right-4 z-50 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-zinc-100" />
                  </button>
                )}

                {/* Descrição da Imagem */}
                {evento.galeria[imagemAtual].descricao && (
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
    </div>
  );
};

export default EventoDetalhe;
