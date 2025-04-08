// Importações de contexto
import { AuthProvider } from "@/context/AuthContext";

// Componentes UI e Providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Roteamento
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Temas e Scroll
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from './components/ScrollToTop';
import { NoticiaProvider } from "@/data/NoticiaContext";

// Layout
import Layout from "./components/layout/Layout";

// Páginas principais
import Home from "./pages/Home";
import Cinema from "./pages/Cinema";
import Novidades from "./pages/Novidades";
import Eventos from "./pages/Eventos";
import OndeIr from "./pages/OndeIr";
import Classificados from "./pages/Classificados";
import Servicos from "./pages/Servicos";

// Páginas de detalhes
import EventoDetalhe from "./pages/EventoDetalhe";
import FilmeDetalhe from "./pages/FilmeDetalhe";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import LocalDetalhe from "./pages/LocalDetalhe";
import ClassificadoDetalhe from "./pages/ClassificadoDetalhe";
import ServicoDetalhe from "./pages/ServicoDetalhe";

// Admin
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

// 404
import NotFound from "./pages/NotFound";

// React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Sonner />
          <Router>
            <ScrollToTop />
            <NoticiaProvider>
              <AuthProvider>
                <Layout>
                  <AnimatePresence mode="wait">
                    <Routes>
                      {/* Rotas públicas */}
                      <Route path="/" element={<Home />} />
                      <Route path="/cinema" element={<Cinema />} />
                      <Route path="/novidades" element={<Novidades />} />
                      <Route path="/eventos" element={<Eventos />} />
                      <Route path="/onde-ir" element={<OndeIr />} />
                      <Route path="/classificados" element={<Classificados />} />
                      <Route path="/servicos" element={<Servicos />} />

                      {/* Detalhes */}
                      <Route path="/eventos/:id" element={<EventoDetalhe />} />
                      <Route path="/filme/:id" element={<FilmeDetalhe />} />
                      <Route path="/novidade/:id" element={<NoticiaDetalhe />} />
                      <Route path="/onde-ir/:id" element={<LocalDetalhe />} />
                      <Route path="/classificado/:id" element={<ClassificadoDetalhe />} />
                      <Route path="/servico/:id" element={<ServicoDetalhe />} />

                      {/* Admin */}
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/admin/login" element={<AdminLogin />} />

                      {/* Página não encontrada */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </Layout>
              </AuthProvider>
            </NoticiaProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
