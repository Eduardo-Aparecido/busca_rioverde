import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  Share2, 
  ArrowLeft 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GaleriaModal } from "@/components/ui/galeria-modal";
import { useCurtida } from "@/hooks/useCurtida";

const eventos = [
  {
    id: "1",
    titulo: "Carol Delgado em Love is Magic",
    imagem: "/images/eventos/carol_delgado/caroldelgado.png",
    galeria: [
      "/images/eventos/carol_delgado/caroldelgado_01.jpeg",
      "/images/eventos/carol_delgado/caroldelgado_02.jpeg",
    ],
    data: "06 Jun 2025",
    hora: "20:00",
    local: "The Haus Coffee&Beer - Rio Verde",
    categoria: "Comédia Stand-Up",
    descricao: `
      Carol Delgado – A Rainha da Comédia (e dos Chifres)

      Se rir é o melhor remédio, Carol Delgado é a médica que você precisa! 
      Com um humor ácido, irreverente e sem medo de tocar na ferida 
      (principalmente as amorosas), Carol transforma as desgraças da vida 
      – e os chifres – em piada.

      Seu lema? "Rir da desgraça (e dos chifres) é o nosso lema."

      Com um carisma inconfundível e uma presença de palco avassaladora, 
      Carol já conquistou plateias por onde passa, arrancando gargalhadas 
      de quem já chorou por amor e de quem ainda vai chorar.

      Seus textos afiados, inspirados nas situações mais absurdas do dia 
      a dia, fazem qualquer um se identificar e, claro, rir até a barriga doer.

      Seja no stand-up, nas redes sociais ou em qualquer canto onde haja 
      espaço para uma boa piada, Carol Delgado prova que a melhor forma 
      de superar as desilusões é com muito humor. Afinal, se a vida te 
      der um chifre, que pelo menos vire um show de comédia!
    `,
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

const EventoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  
  const evento = eventos.find(e => e.id === id);
  const { curtido, contagemCurtidas, handleCurtir } = useCurtida({ 
    itemId: id || '', 
    tipo: 'evento' 
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (!evento) return;
    
    setTimeout(() => {
      setCarregando(false);
    }, 300);
  }, [evento]);

  if (!evento) {
    return <div>Evento não encontrado</div>;
  }

  return (
    <div>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {carregando ? (
          <div className="absolute inset-0 bg-background" />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                backgroundImage: `url(${evento.imagem})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </>
        )}
        
        <div className="container mx-auto px-4 h-full relative">
          <div className="absolute bottom-8 left-4">
            <Link to="/eventos" className="text-white/80 hover:text-white flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para eventos</span>
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              {evento.titulo}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-6 mb-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-5 w-5 mr-2 text-accent" />
                    <span>{evento.data}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-2 text-accent" />
                    <span>{evento.hora}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2 text-accent" />
                    <span>{evento.local}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Sobre o evento</h3>
                <p className="text-muted-foreground mb-6 whitespace-pre-line leading-relaxed">
                  {evento.descricao}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Localização</h3>
                <p className="text-muted-foreground mb-4">{evento.local}</p>
                
                <div className="rounded-xl overflow-hidden h-[250px] bg-secondary/50">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-muted-foreground">Mapa será carregado aqui</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-card rounded-xl border border-border p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Galeria</h3>
                <div className="grid grid-cols-2 gap-3">
                  {evento.galeria.map((imagem, index) => (
                    <button
                      key={index}
                      className="aspect-[4/3] rounded-lg overflow-hidden"
                      onClick={() => {
                        setImagemAtual(index);
                        setModalAberto(true);
                      }}
                    >
                      <img
                        src={imagem}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4">Ingressos</h3>
                <p className="text-muted-foreground mb-6">{evento.ingressos}</p>
                <Button className="w-full">Comprar Ingresso</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalAberto && (
        <GaleriaModal
          imagens={evento.galeria}
          imagemAtual={imagemAtual}
          onClose={() => setModalAberto(false)}
          onImagemChange={setImagemAtual}
        />
      )}

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-primary"
        onClick={handleCurtir}
      >
        {curtido ? (
          <Heart className="h-6 w-6 fill-current" />
        ) : (
          <Heart className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}

export default EventoDetalhe;
