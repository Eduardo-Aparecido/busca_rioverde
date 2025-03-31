import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompartilhar } from "@/hooks/useCompartilhar";

interface ShareButtonProps {
  titulo: string;
  texto?: string;
  url?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  iconOnly?: boolean;
}

export function ShareButton({
  titulo,
  texto,
  url,
  variant = "outline",
  size = "default",
  className = "",
  iconOnly = false
}: ShareButtonProps) {
  const { compartilhar, compartilhando } = useCompartilhar();

  return (
    <Button
      variant={variant}
      size={iconOnly ? "icon" : size}
      className={`flex items-center gap-2 ${className}`}
      onClick={() => compartilhar({ titulo, texto, url })}
      disabled={compartilhando}
    >
      <Share2 className="h-4 w-4" />
      {!iconOnly && <span>{compartilhando ? 'Compartilhando...' : 'Compartilhar'}</span>}
    </Button>
  );
} 