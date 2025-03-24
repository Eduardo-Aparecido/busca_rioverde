
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio de dados
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          titulo="Painel Administrativo"
          subtitulo="Gerencie eventos, notícias e locais"
          centered
        />

        <Tabs defaultValue="eventos" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="eventos">Eventos</TabsTrigger>
            <TabsTrigger value="noticias">Notícias</TabsTrigger>
            <TabsTrigger value="locais">Locais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="eventos">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="titulo" className="text-sm font-medium">Título</label>
                      <Input id="titulo" placeholder="Digite o título do evento" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="categoria" className="text-sm font-medium">Categoria</label>
                      <Input id="categoria" placeholder="Categoria" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="data" className="text-sm font-medium">Data</label>
                      <Input id="data" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="hora" className="text-sm font-medium">Hora</label>
                      <Input id="hora" type="time" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="local" className="text-sm font-medium">Local</label>
                      <Input id="local" placeholder="Nome do local" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
                    <Textarea id="descricao" placeholder="Descrição do evento" rows={5} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="imagem" className="text-sm font-medium">Imagem</label>
                    <Input id="imagem" type="file" accept="image/*" />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Adicionar Evento"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="noticias">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Nova Notícia</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="tituloNoticia" className="text-sm font-medium">Título</label>
                      <Input id="tituloNoticia" placeholder="Digite o título da notícia" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="categoriaNoticia" className="text-sm font-medium">Categoria</label>
                      <Input id="categoriaNoticia" placeholder="Categoria" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="conteudoNoticia" className="text-sm font-medium">Conteúdo</label>
                    <Textarea id="conteudoNoticia" placeholder="Conteúdo da notícia" rows={8} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="imagemNoticia" className="text-sm font-medium">Imagem</label>
                    <Input id="imagemNoticia" type="file" accept="image/*" />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Adicionar Notícia"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locais">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Local</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nomeLocal" className="text-sm font-medium">Nome</label>
                      <Input id="nomeLocal" placeholder="Nome do local" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="categoriaLocal" className="text-sm font-medium">Categoria</label>
                      <Input id="categoriaLocal" placeholder="Restaurante, Bar, Parque, etc" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="enderecoLocal" className="text-sm font-medium">Endereço</label>
                    <Input id="enderecoLocal" placeholder="Endereço completo" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="telefoneLocal" className="text-sm font-medium">Telefone</label>
                      <Input id="telefoneLocal" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="avaliacaoLocal" className="text-sm font-medium">Avaliação (1-5)</label>
                      <Input id="avaliacaoLocal" type="number" min="1" max="5" step="0.1" defaultValue="5" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="descricaoLocal" className="text-sm font-medium">Descrição</label>
                    <Textarea id="descricaoLocal" placeholder="Descrição do local" rows={5} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="imagemLocal" className="text-sm font-medium">Imagem</label>
                    <Input id="imagemLocal" type="file" accept="image/*" />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Adicionar Local"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Admin;
