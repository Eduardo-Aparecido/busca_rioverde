import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Heart, 
  Share2,
  ArrowLeft,
  Star,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFuncionamento } from "@/components/ui/status-funcionamento";
import { ShareButtons } from "@/components/ui/share-buttons";
import { GoogleMap } from "@/components/ui/google-map";
import { useCurtida } from "@/hooks/useCurtida";

interface Horario {
  dia: string;
  horarios: string[];
}

interface Local {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  website: string;
  horariosFuncionamento: Horario[];
  ultimaAtualizacao: string;
  avaliacao: number;
  avaliacoes: number;
  galeria: string[];
  comodidades: string[];
}

// Dados simulados para desenvolvimento
const locais: Local[] = [
  {
    id: "1",
    nome: "Cervejaria Imperatriz",
    descricao: `
      A Cervejaria Imperatriz é um local acolhedor que oferece cervejas 
      artesanais de alta qualidade, petiscos deliciosos e um ambiente 
      descontraído para encontros com amigos e família.
    `,
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(64) 99999-9999",
    website: "www.cervejariaimperatriz.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["18:00", "23:00"] },
      { dia: "Terça", horarios: ["18:00", "23:00"] },
      { dia: "Quarta", horarios: ["18:00", "23:00"] },
      { dia: "Quinta", horarios: ["18:00", "00:00"] },
      { dia: "Sexta", horarios: ["18:00", "01:00"] },
      { dia: "Sábado", horarios: ["16:00", "01:00"] },
      { dia: "Domingo", horarios: ["16:00", "22:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T14:30:00",
    avaliacao: 4.5,
    avaliacoes: 128,
    galeria: [
      "cervejaria-1.jpg",
      "cervejaria-2.jpg",
      "cervejaria-3.jpg",
      "cervejaria-4.jpg"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Estacionamento",
      "Aceita Cartão",
      "Música ao Vivo",
      "Pet Friendly"
    ]
  },
  {
    id: "2",
    nome: "Restaurante Sabor & Arte",
    descricao: `
      Um restaurante sofisticado que oferece o melhor da gastronomia 
      contemporânea com ingredientes locais.
    `,
    endereco: "Av. Brasil, 456 - Centro",
    telefone: "(64) 98888-8888",
    website: "www.saborarte.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["11:00", "15:00"] },
      { dia: "Terça", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Quarta", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Quinta", horarios: ["11:00", "15:00", "19:00", "23:00"] },
      { dia: "Sexta", horarios: ["11:00", "15:00", "19:00", "00:00"] },
      { dia: "Sábado", horarios: ["11:00", "16:00", "19:00", "00:00"] },
      { dia: "Domingo", horarios: ["11:00", "16:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T12:00:00",
    avaliacao: 4.7,
    avaliacoes: 256,
    galeria: [
      "restaurante-1.jpg",
      "restaurante-2.jpg",
      "restaurante-3.jpg",
      "restaurante-4.jpg"
    ],
    comodidades: [
      "Ar Condicionado",
      "Estacionamento",
      "Aceita Cartão",
      "Acessibilidade",
      "Reservas"
    ]
  }
];

export default function LocalDetalhe() {
  const { id } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [local] = useState<Local>({
    id: "1",
    nome: "Cervejaria Imperatriz",
    descricao: `
      A Cervejaria Imperatriz é um local acolhedor que oferece cervejas 
      artesanais de alta qualidade, petiscos deliciosos e um ambiente 
      descontraído para encontros com amigos e família.
    `,
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(64) 99999-9999",
    website: "www.cervejariaimperatriz.com.br",
    horariosFuncionamento: [
      { dia: "Segunda", horarios: ["18:00", "23:00"] },
      { dia: "Terça", horarios: ["18:00", "23:00"] },
      { dia: "Quarta", horarios: ["18:00", "23:00"] },
      { dia: "Quinta", horarios: ["18:00", "00:00"] },
      { dia: "Sexta", horarios: ["18:00", "01:00"] },
      { dia: "Sábado", horarios: ["16:00", "01:00"] },
      { dia: "Domingo", horarios: ["16:00", "22:00"] }
    ],
    ultimaAtualizacao: "2024-03-23T14:30:00",
    avaliacao: 4.5,
    avaliacoes: 128,
    galeria: [
      "cervejaria-1.jpg",
      "cervejaria-2.jpg",
      "cervejaria-3.jpg",
      "cervejaria-4.jpg"
    ],
    comodidades: [
      "Wi-Fi Grátis",
      "Estacionamento",
      "Aceita Cartão",
      "Música ao Vivo",
      "Pet Friendly"
    ]
  });
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  
  const { curtido, contagemCurtidas, handleCurtir } = useCurtida({ 
    itemId: id || '', 
    tipo: 'local' 
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 1500);
  }, []);

  if (!local && !carregando) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Local não encontrado</h2>
        <p className="mb-8">O local que você está procurando não existe ou foi removido.</p>
        <Link to="/onde-ir">
          <Button>Explorar outros lugares</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{local.nome}</h1>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-start sm:items-center justify-between">
            <StatusFuncionamento 
              horarios={local.horariosFuncionamento} 
              ultimaAtualizacao={local.ultimaAtualizacao} 
            />
            <ShareButtons 
              url={window.location.href}
              title={local.nome}
              description={local.descricao}
            />
          </div>
        </div>
        
        <section className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] overflow-hidden rounded-lg">
          {carregando ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <img
                src={local.galeria[0]}
                alt={local.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-accent/90">
                      {local.comodidades[0]}
                    </Badge>
                  </div>
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
              </div>
            </>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Sobre</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {local.descricao}
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Galeria</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {local.galeria.map((imagem, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={imagem}
                      alt={`${local.nome} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Informações</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                  <p>{local.endereco}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                  <p>{local.telefone}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 mt-1 text-muted-foreground" />
                  <a 
                    href={local.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {local.website}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Localização</h2>
              <GoogleMap endereco={local.endereco} className="h-[200px] sm:h-[300px]" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Comodidades</h2>
              <div className="flex flex-wrap gap-2">
                {local.comodidades.map((comodidade, index) => (
                  <Badge key={index} variant="outline">
                    {comodidade}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
