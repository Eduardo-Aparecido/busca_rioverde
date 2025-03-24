import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "../theme-provider";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Cinema", path: "/cinema" },
    { name: "Novidades", path: "/novidades" },
    { name: "Eventos", path: "/eventos" },
    { name: "Onde Ir", path: "/onde-ir" }
  ];

  return (
    <div className="pb-16 md:pb-0 bg-black">
      {/* Desktop Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-display font-bold text-foreground"
            >
              <span className="text-accent">Busca</span>RioVerde
            </Link>

            <nav className="flex items-center space-x-1">
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
                    >
                      {link.name}
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

              <div className="flex items-center ml-4 space-x-2">
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
                <Button asChild className="rounded-full" size="sm">
                  <Link to="/admin">Admin</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 md:hidden">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-2 px-4">
            <Link
              to="/"
              className="text-lg font-display font-bold text-white"
            >
              <span className="text-primary">Busca</span>RioVerde
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-white/70"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10 md:hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center py-3 px-1 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-white/70"
                }`}
              >
                <span className="text-xs">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
