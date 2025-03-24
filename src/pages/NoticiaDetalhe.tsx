import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Heart, 
  Share2, 
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dados simulados para desenvolvimento
const noticias = [
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
    tags: ["café", "gastronomia", "inauguração"]
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
    tags: ["parque", "esportes", "lazer"]
  }
];

const NoticiaDetalhe = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState<any>(null);
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [curtido, setCurtido] = useState(false);
  const [contagemCurtidas, setContagemCurtidas] = useState(0);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  useEffect(() => {
    const noticiaEncontrada = noticias.find(n => n.id === id);
    
    if (noticiaEncontrada) {
      setNoticia(noticiaEncontrada);
      setImagemPrincipal(noticiaEncontrada.galeria[0]);
      setContagemCurtidas(Math.floor(Math.random() * 50) + 10);
      setComentarios([
        {
          id: "1",
          usuario: "Julia Santos",
          avatar: "https://randomuser.me/api/portraits/women/12.jpg",
          data: "Ontem",
          texto: "Excelente notícia! Precisávamos de mais locais assim na cidade.",
        },
        {
          id: "2",
          usuario: "Pedro Almeida",
          avatar: "https://randomuser.me/api/portraits/men/34.jpg",
          data: "2 dias atrás",
          texto: "Já visitei e recomendo muito! Ótima iniciativa.",
        },
      ]);
    }
    
    setTimeout(() => {
      setCarregando(false);
    }, 300);
  }, [id]);

  const handleCurtir = () => {
    if (curtido) {
      setContagemCurtidas(prev => prev - 1);
    } else {
      setContagemCurtidas(prev => prev + 1);
    }
    setCurtido(!curtido);
  };

  const handleEnviarComentario = () => {
    if (!comentario.trim()) return;
    
    alert("Funcionalidade de comentários será implementada em breve!");
    setComentario("");
  };

  if (!noticia && !carregando) {
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
    <div>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {carregando ? (
          <div className="absolute inset-0 bg-background" />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                backgroundImage: `url(/images/${imagemPrincipal})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </>
        )}
        
        <div className="container mx-auto px-4 h-full relative">
          <div className="absolute bottom-8 left-4">
            <Link to="/novidades" className="text-white/80 hover:text-white flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para novidades</span>
            </Link>
            
            {!carregando && (
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                {noticia?.titulo}
              </h1>
            )}
          </div>
        </div>
      </section>

      {!carregando && noticia && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border border-border p-6 mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar>
                      <AvatarImage src={noticia.autorImagem} alt={noticia.autor} />
                      <AvatarFallback>{noticia.autor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{noticia.autor}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {noticia.data}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {noticia.conteudo.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index} className="text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {noticia.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Comentários ({comentarios.length})</h3>
                    <Button variant="outline" size="sm" onClick={handleCurtir}>
                      <Heart className={`h-4 w-4 mr-2 ${curtido ? "fill-red-500 text-red-500" : ""}`} />
                      {contagemCurtidas}
                    </Button>
                  </div>
                  
                  <div className="space-y-6 mb-6">
                    {comentarios.map((comentario) => (
                      <div key={comentario.id} className="flex gap-4">
                        <img
                          src={comentario.avatar}
                          alt={comentario.usuario}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{comentario.usuario}</span>
                            <span className="text-xs text-muted-foreground">{comentario.data}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comentario.texto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-border pt-6">
                    <h4 className="font-medium mb-3">Deixe seu comentário</h4>
                    <Textarea
                      placeholder="Escreva um comentário..."
                      className="mb-3 min-h-[100px]"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleEnviarComentario}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comentar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-card rounded-xl border border-border p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Galeria</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {noticia.galeria.map((imagem: string, index: number) => (
                      <div
                        key={index}
                        className={`${
                          index === 0 ? "col-span-2" : "col-span-1"
                        } rounded-lg overflow-hidden cursor-pointer`}
                        onClick={() => setImagemPrincipal(imagem)}
                      >
                        <img
                          src={`/images/${imagem}`}
                          alt={`Foto ${index + 1} da notícia`}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            imagemPrincipal === imagem ? "ring-2 ring-accent" : "hover:brightness-75"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card rounded-xl border border-border p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Compartilhar</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
                
                <div className="bg-accent/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Informações</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>Categoria: {noticia.categoria}</li>
                    <li>Publicado em: {noticia.data}</li>
                    <li>Autor: {noticia.autor}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NoticiaDetalhe;
