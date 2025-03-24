
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-display font-bold text-foreground">
              <span className="text-accent">Busca</span>RioVerde
            </Link>
            <p className="mt-4 text-muted-foreground">
              Descubra os melhores eventos e atrações em Rio Verde e região.
              Filmes, restaurantes, bares, parques e muito mais em um só lugar.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/cinema"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Cinema
                </Link>
              </li>
              <li>
                <Link
                  to="/novidades"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Novidades
                </Link>
              </li>
              <li>
                <Link
                  to="/eventos"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  to="/onde-ir"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Onde Ir
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">aparecidoj.edu@gmail.com</li>
              <li className="text-muted-foreground">(15) 9 9760-7098</li>
              <li className="text-muted-foreground mt-4">
                Rio Verde, Goiás
                <br />
                Brasil
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>O Busca Rio Verde atua apenas como um meio de divulgação e não se responsabiliza pelos eventos, estabelecimentos, notícias e programação de cinema publicados. Os horários, preços e atrações estão sujeitos a alterações pelos organizadores sem aviso prévio.</p>
        </div>
        <div className="border-t border-border/40 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {currentYear} Busca Rio Verde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
