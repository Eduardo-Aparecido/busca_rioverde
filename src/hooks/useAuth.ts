import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de autenticação
    const checkAuth = async () => {
      try {
        // Aqui você implementaria a verificação real de autenticação
        // Por enquanto, vamos simular um usuário logado
        const mockUser: User = {
          id: '1',
          name: 'Usuário Teste',
          email: 'teste@email.com',
          role: 'user'
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Aqui você implementaria a lógica real de login
      // Por enquanto, vamos simular um login bem-sucedido
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email: email,
        role: 'user'
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
} 