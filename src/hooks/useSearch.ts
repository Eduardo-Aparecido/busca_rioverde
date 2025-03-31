import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface SearchOptions<T> {
  data: T[];
  keys: string[];
  threshold?: number;
}

export function useSearch<T>({ data, keys, threshold = 0.4 }: SearchOptions<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<T[]>(data);

  // Configurar o Fuse com os dados e opções
  const fuse = useMemo(() => {
    const options = {
      keys,
      threshold, // 0.0 = match perfeito, 1.0 = match muito flexível
      ignoreLocation: true,
      shouldSort: true,
    };
    return new Fuse(data, options);
  }, [data, keys, threshold]);

  // Função para realizar a busca
  const performSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setResults(data);
      return;
    }

    const searchResults = fuse.search(term);
    setResults(searchResults.map(result => result.item));
  };

  return {
    searchTerm,
    results,
    search: performSearch,
  };
} 