// src/pages/AdminLogin.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Login realizado com sucesso!");
      navigate("/admin"); // redireciona para a área protegida
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        toast.error("Falha no login. Verifique e-mail e senha.");
        console.error(erro.message);
      } else {
        toast.error("Erro desconhecido. Por favor, tente novamente.");
        console.error(erro);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-white text-center">Login Admin</h1>

        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <Button type="submit" className="w-full" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
