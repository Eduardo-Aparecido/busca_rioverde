/**
 * Importação dos componentes e hooks necessários
 * - useState/useEffect: Hooks para estado e efeitos
 * - useLocation: Hook do React Router para localização atual
 * - Ícones: Moon, Sun, Search do Lucide
 * - motion: Componente do Framer Motion para animações
 * - Button: Componente base de botão
 * - useTheme: Hook personalizado para tema
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "../theme-provider";

/**
 * Interface que define as propriedades da Navbar
 * @property isScrolled - Indica se a página foi rolada (usado para efeitos visuais)
 */
interface NavbarProps {
  isScrolled: boolean;
}

/**
 * Componente Navbar
 * 
 * Barra de navegação responsiva com versões desktop e mobile
 * 
 * Características:
 * - Versão desktop: Fixa no topo com efeito de transparência
 * - Versão mobile: Header fixo no topo e navegação no rodapé
 * - Indicador animado na aba atual (desktop)
 * - Botões de busca e alternância de tema
 * - Suporte a tema claro/escuro
 * - Logo com link para home
 * 
 * Estados:
 * - location: Usado para destacar a página atual
 * - theme: Controle do tema atual
 */
const Navbar = ({ isScrolled }: NavbarProps) => {
  // Hooks para controle de navegação e tema
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  /**
   * Alterna entre os temas claro e escuro
   */
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /**
   * Links de navegação principais
   * Usados tanto na versão desktop quanto mobile
   */
  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Cinema", path: "/cinema" },
    { name: "Novidades", path: "/novidades" },
    { name: "Eventos", path: "/eventos" },
    { name: "Onde Ir", path: "/onde-ir" }
  ];

  return (
    <div className="relative">
      {/* 
        Header Desktop
        - Fundo transparente que fica semi-opaco ao rolar
        - Backdrop blur para melhor legibilidade
        - Escondido em telas mobile
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled
            ? "bg-white dark:bg-black backdrop-blur-md shadow-sm"
            : "bg-white dark:bg-black"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center pl-16"
            >
              <img 
                src="/images/logomarca/logomarca.png"
                alt="Routis"
                className="h-14 w-auto"
              />
            </Link>

            {/* Navegação Desktop */}
            <nav className="flex items-center space-x-1">
              {/* Links de Navegação */}
              <ul className="flex space-x-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                        location.pathname === link.path
                          ? "text-accent font-semibold"
                          : "text-foreground/80 hover:text-accent"
                      }`}
                      style={{ 
                        textTransform: 'uppercase', 
                        fontWeight: '800', 
                        letterSpacing: '0.05em'
                      }}
                    >
                      {link.name}
                      {/* Indicador animado da página atual */}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Botões de Ação */}
              <div className="flex items-center ml-4 space-x-2">
                {/* Botão de Busca */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 rounded-full"
                >
                  <Search className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                {/* Botão de Tema */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full"
                >
                  {theme === "light" ? (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  )}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* 
        Header Mobile
        - Fixo no topo
        - Apenas logo e botões de ação
        - Visível apenas em telas mobile
      */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/100 dark:bg-black border-b border-border md:hidden">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-3 px-4">
            {/* Logo Mobile */}
            <Link
              to="/"
              className="flex items-center pl-2"
            >
              <img 
                src="/images/logomarca/logomarca.png"
                alt="Routis"
                className="h-10 w-auto"
              />
            </Link>

            {/* Botões de Ação Mobile */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/70"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground/70"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Espaçador para compensar o header fixo */}
      <div className="h-[52px] md:hidden" />

      {/* 
        Navegação Mobile (Footer)
        - Fixa no rodapé
        - Links principais em grid
        - Visível apenas em telas mobile
      */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border md:hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-1 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center py-6 px-1 space-y-1 text-center transition-colors ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-foreground/90 hover:text-accent"
                }`}
              >
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Espaçador para o footer no mobile */}
      <div className={`md:hidden bg-secondary/50 dark:bg-zinc-900 ${
        location.pathname === "/" ? "h-24" : 
        location.pathname === "/cinema" ? "h-0" :
        location.pathname === "/novidades" ? "h-0" :
        location.pathname === "/eventos" ? "h-0" :
        location.pathname === "/onde-ir" ? "h-0" : "h-0"
      }`} />
    </div>
  );
};

export default Navbar;
