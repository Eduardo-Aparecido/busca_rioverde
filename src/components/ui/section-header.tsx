
import { motion } from "framer-motion";

interface SectionHeaderProps {
  titulo: string;
  subtitulo?: string;
  centered?: boolean;
}

const SectionHeader = ({ titulo, subtitulo, centered = false }: SectionHeaderProps) => {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
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
    </div>
  );
};

export default SectionHeader;
