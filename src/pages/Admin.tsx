import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNoticias } from "@/data/NoticiaContext";
import AdminNoticiaForm from "./AdminNoticiaForm";

const Admin = () => {
  const { isAdmin, logout } = useAuth();
  const { noticias } = useNoticias();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel do Administrador</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      {/* 🔽 Formulário para adicionar nova notícia */}
      <AdminNoticiaForm />

      <h2 className="text-xl font-semibold mt-10 mb-2">Notícias publicadas:</h2>
        <ul className="space-y-2 mb-6">
        {[...new Map(noticias.map(n => [n.id, n])).values()].map((noticia) => (
            <li key={noticia.id} className="bg-gray-100 p-4 rounded shadow">
            <p className="font-bold">{noticia.titulo}</p>
            <p className="text-sm text-gray-600">
                {noticia.data ? new Date(noticia.data).toLocaleDateString("pt-BR") : ""}
            </p>
            </li>
        ))}
        </ul>

    </div>
  );
};

export default Admin;
