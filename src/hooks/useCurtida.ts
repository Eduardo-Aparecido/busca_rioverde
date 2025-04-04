import { useState, useEffect } from 'react';

interface UseCurtidaProps {
  itemId: string;
  tipo: 'evento' | 'filme' | 'local';
}

export function useCurtida({ itemId, tipo }: UseCurtidaProps) {
  const [curtido, setCurtido] = useState(false);
  const [contagemCurtidas, setContagemCurtidas] = useState(0);

  // Carrega o estado inicial do localStorage
  useEffect(() => {
    const curtidasSalvas = localStorage.getItem('curtidas') || '{}';
    const curtidas = JSON.parse(curtidasSalvas);
    const itemKey = `${tipo}_${itemId}`;
    
    setCurtido(!!curtidas[itemKey]);
    
    // Simula uma contagem de curtidas aleatória entre 50 e 500
    const contagemSalva = localStorage.getItem(`contagem_${itemKey}`);
    if (contagemSalva) {
      setContagemCurtidas(parseInt(contagemSalva));
    } else {
      const contagemInicial = Math.floor(Math.random() * 450) + 50;
      localStorage.setItem(`contagem_${itemKey}`, contagemInicial.toString());
      setContagemCurtidas(contagemInicial);
    }
  }, [itemId, tipo]);

  const handleCurtir = () => {
    const curtidasSalvas = localStorage.getItem('curtidas') || '{}';
    const curtidas = JSON.parse(curtidasSalvas);
    const itemKey = `${tipo}_${itemId}`;
    
    const novoEstado = !curtido;
    
    if (novoEstado) {
      curtidas[itemKey] = true;
      setContagemCurtidas(prev => prev + 1);
    } else {
      delete curtidas[itemKey];
      setContagemCurtidas(prev => prev - 1);
    }
    
    localStorage.setItem('curtidas', JSON.stringify(curtidas));
    localStorage.setItem(`contagem_${itemKey}`, contagemCurtidas.toString());
    setCurtido(novoEstado);
  };

  return {
    curtido,
    contagemCurtidas,
    handleCurtir
  };
} 