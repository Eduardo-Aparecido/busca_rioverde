/**
 * Importação dos componentes e providers necessários para a aplicação
 * - Toaster e Sonner: Notificações do sistema
 * - TooltipProvider: Tooltips da aplicação
 * - QueryClient: Cliente para gerenciamento de cache e requisições
 * - BrowserRouter e Routes: Roteamento da aplicação
 * - AnimatePresence: Animações de transição entre páginas
 * - ThemeProvider: Gerenciamento do tema (claro/escuro)
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Importação dos componentes de layout e páginas
 * - Layout: Componente base que contém a navbar e estrutura comum
 * - Páginas: Componentes principais para cada rota
 */
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Cinema from "./pages/Cinema";
import Novidades from "./pages/Novidades";
import Eventos from "./pages/Eventos";
import OndeIr from "./pages/OndeIr";
import EventoDetalhe from "./pages/EventoDetalhe";
import FilmeDetalhe from "./pages/FilmeDetalhe";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import LocalDetalhe from "./pages/LocalDetalhe";
import NotFound from "./pages/NotFound";
import Classificados from "./pages/Classificados";
import ClassificadoDetalhe from "./pages/ClassificadoDetalhe";
import Servicos from "./pages/Servicos";
import ServicoDetalhe from "./pages/ServicoDetalhe";

/**
 * Cliente do React Query para gerenciamento de cache e requisições
 * Configuração padrão que será usada em toda a aplicação
 */
const queryClient = new QueryClient();

/**
 * Componente principal da aplicação
 * Configura os providers necessários e define as rotas disponíveis
 * 
 * Estrutura de providers (de fora para dentro):
 * 1. QueryClientProvider: Gerenciamento de dados e cache
 * 2. ThemeProvider: Tema claro/escuro
 * 3. TooltipProvider: Tooltips consistentes
 * 4. BrowserRouter: Roteamento
 * 5. Layout: Estrutura comum (navbar, etc)
 * 
 * Rotas disponíveis:
 * - /: Página inicial
 * - /cinema: Lista de filmes
 * - /novidades: Notícias e atualizações
 * - /eventos: Lista de eventos
 * - /onde-ir: Sugestões de lugares
 * - /evento/:id: Detalhes de um evento específico
 * - /filme/:id: Detalhes de um filme
 * - /novidade/:id: Detalhes de uma notícia
 * - /onde-ir/:id: Detalhes de um estabelecimento
 * - /classificados: Lista de classificados
 * - /classificado/:id: Detalhes de um classificado
 * - /servicos: Lista de serviços
 * - /servico/:id: Detalhes de um serviço
 * - *: Página 404 para rotas não encontradas
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Sonner />
          
          <Router>
            <Layout>
              {/* AnimatePresence para animações suaves entre páginas */}
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Rotas principais */}
                  <Route path="/" element={<Home />} />
                  <Route path="/cinema" element={<Cinema />} />
                  <Route path="/novidades" element={<Novidades />} />
                  <Route path="/eventos" element={<Eventos />} />
                  <Route path="/onde-ir" element={<OndeIr />} />
                  <Route path="/classificados" element={<Classificados />} />
                  <Route path="/servicos" element={<Servicos />} />
                  
                  {/* Rotas de detalhes */}
                  <Route path="/evento/:id" element={<EventoDetalhe />} />
                  <Route path="/filme/:id" element={<FilmeDetalhe />} />
                  <Route path="/novidade/:id" element={<NoticiaDetalhe />} />
                  <Route path="/onde-ir/:id" element={<LocalDetalhe />} />
                  <Route path="/classificado/:id" element={<ClassificadoDetalhe />} />
                  <Route path="/servico/:id" element={<ServicoDetalhe />} />
                  
                  {/* Rota 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Layout>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
