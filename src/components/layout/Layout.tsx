/**
 * Importação dos componentes e hooks necessários
 * - ReactNode: Tipo para elementos React
 * - useState/useEffect: Hooks para estado e efeitos
 * - useLocation: Hook do React Router para localização atual
 * - motion: Componente do Framer Motion para animações
 * - Navbar/Footer: Componentes de layout
 * - useTheme: Hook personalizado para tema
 */
import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../theme-provider";

/**
 * Interface que define as propriedades do Layout
 * @property children - Conteúdo a ser renderizado dentro do layout
 */
interface LayoutProps {
  children: ReactNode;
}

/**
 * Componente Layout
 * 
 * Componente principal que define a estrutura base da aplicação
 * Envolve todas as páginas com navbar, main content e footer
 * 
 * Características:
 * - Navbar fixa no topo com efeito de scroll
 * - Animações de transição entre páginas
 * - Footer sempre no final da página
 * - Altura mínima de 100vh para garantir footer no fim
 * - Suporte a tema claro/escuro
 * 
 * Estados:
 * - isScrolled: Controla efeito visual da navbar ao rolar
 * - location: Usado para animar transições de página
 * - theme: Tema atual da aplicação
 */
const Layout = ({ children }: LayoutProps) => {
  // Hooks para controle de estado e navegação
  const location = useLocation();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  
  /**
   * Effect para detectar scroll da página
   * Atualiza isScrolled quando o usuário rola mais de 10px
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Configuração das animações de página
   * - initial: Estado inicial (opacidade 0, move para cima)
   * - in: Estado ativo (opacidade 1, posição normal)
   * - out: Estado de saída (opacidade 0, move para baixo)
   */
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -10,
    },
  };

  /**
   * Configuração da transição
   * - type: Tipo de easing
   * - ease: Curva de animação
   * - duration: Duração em segundos
   */
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar fixa no topo */}
      <Navbar isScrolled={isScrolled} />

      {/* Conteúdo principal com padding para navbar */}
      <main className="flex-grow pt-0 lg:pt-16">
        {/* Container com animações de página */}
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer sempre no final */}
      <Footer />
    </div>
  );
};

export default Layout;
