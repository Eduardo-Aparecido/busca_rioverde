
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="eventozen-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cinema" element={<Cinema />} />
                <Route path="/novidades" element={<Novidades />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/onde-ir" element={<OndeIr />} />
                <Route path="/evento/:id" element={<EventoDetalhe />} />
                <Route path="/filme/:id" element={<FilmeDetalhe />} />
                <Route path="/novidade/:id" element={<NoticiaDetalhe />} />
                <Route path="/local/:id" element={<LocalDetalhe />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
