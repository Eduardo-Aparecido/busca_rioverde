import { useState } from 'react';

interface CompartilharProps {
  titulo: string;
  texto?: string;
  url?: string;
}

export function useCompartilhar() {
  const [compartilhando, setCompartilhando] = useState(false);

  const compartilhar = async ({ titulo, texto, url = window.location.href }: CompartilharProps) => {
    setCompartilhando(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: titulo,
          text: texto,
          url: url
        });
      } else {
        // Fallback para navegadores que não suportam a Web Share API
        await navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Erro ao compartilhar:', error);
      }
    } finally {
      setCompartilhando(false);
    }
  };

  return {
    compartilhar,
    compartilhando
  };
} 