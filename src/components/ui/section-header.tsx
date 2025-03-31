import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  titulo: string;
  subtitulo?: string;
  centered?: boolean;
  link?: string;
  linkText?: string;
}

const SectionHeader = ({ 
  titulo, 
  subtitulo, 
  centered = false,
  link,
  linkText
}: SectionHeaderProps) => {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {titulo}
          </h2>
          
          {subtitulo && (
            <p className="mt-3 text-muted-foreground max-w-2xl">
              {subtitulo}
            </p>
          )}
        </motion.div>

        {link && linkText && (
          <Link 
            to={link} 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
