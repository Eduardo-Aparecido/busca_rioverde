import React, { useEffect, useState } from "react";
import { db } from "@/services/firebaseNoticias";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
  addDoc,
} from "firebase/firestore";

interface ImagemGaleria {
  url: string;
  descricao: string;
}

interface Noticia {
  id: string;
  titulo: string;
}

const AdminNoticiaForm = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [titulo, setTitulo] = useState("");
  const [imagemNome, setImagemNome] = useState("");
  const [autorImagemNome, setAutorImagemNome] = useState("");
  const [galeria, setGaleria] = useState<ImagemGaleria[]>([]);
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [data, setData] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "noticias"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        titulo: doc.data().titulo,
      }));
      setNoticias(lista);
    });
    return () => unsubscribe();
  }, []);

  const resetFormulario = () => {
    setTitulo("");
    setImagemNome("");
    setAutorImagemNome("");
    setGaleria([]);
    setResumo("");
    setConteudo("");
    setData("");
    setAutor("");
    setCategoria("");
    setTags([]);
    setEndereco("");
    setLatitude(0);
    setLongitude(0);
    setEditandoId(null);
  };

  const adicionarGaleria = () => {
    setGaleria([...galeria, { url: "", descricao: "" }]);
  };

  const atualizarGaleria = (index: number, field: keyof ImagemGaleria, value: string) => {
    const novaGaleria = [...galeria];
    novaGaleria[index][field] = value;
    setGaleria(novaGaleria);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !conteudo || !autor) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }


    if (!data.trim()) {
      alert("Por favor, preencha a data corretamente.");
      return;
    }

    try {
      const imagem = imagemNome ? `/images/noticias/${imagemNome}` : "";
      const autorImagem = autorImagemNome ? `/images/noticias/${autorImagemNome}` : "";

      const galeriaFormatada = galeria.map((img) => ({
        url: img.url.startsWith("/images/") ? img.url : `/images/noticias/${img.url}`,
        descricao: img.descricao,
      }));
      

      const noticia = {
        titulo,
        imagem,
        galeria: galeriaFormatada,
        resumo,
        conteudo,
        data,
        autor,
        autorImagem,
        categoria,
        tags,
        endereco,
        latitude,
        longitude,
      };

      if (editandoId) {
        const docRef = doc(db, "noticias", editandoId);
        await setDoc(docRef, noticia);
        alert("Notícia atualizada!");
      } else {
        const novaRef = doc(collection(db, "noticias"));
        await setDoc(novaRef, { ...noticia, id: novaRef.id });
        alert("Notícia adicionada!");
      }

      resetFormulario();
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
      alert("Erro ao salvar notícia.");
    }
  };

  const excluirNoticia = async (id: string) => {
    const confirmar = confirm("Deseja excluir esta notícia?");
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "noticias", id));
      alert("Notícia excluída.");
    } catch (error) {
      console.error("Erro ao excluir notícia:", error);
    }
  };

  const editarNoticia = async (id: string) => {
    try {
      const docSnap = await getDoc(doc(db, "noticias", id));
      if (docSnap.exists()) {
        const dados = docSnap.data();

        setTitulo(dados.titulo || "");
        setImagemNome(dados.imagem?.split("/").pop() || "");
        setAutorImagemNome(dados.autorImagem?.split("/").pop() || "");
        setGaleria(dados.galeria || []);
        setResumo(dados.resumo || "");
        setConteudo(dados.conteudo || "");
        setData(dados.data || "");
        setAutor(dados.autor || "");
        setCategoria(dados.categoria || "");
        setTags(dados.tags || []);
        setEndereco(dados.endereco || "");
        setLatitude(dados.latitude || 0);
        setLongitude(dados.longitude || 0);
        setEditandoId(id);
      }
    } catch (error) {
      console.error("Erro ao carregar notícia para edição:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="block font-medium">Título</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" className="w-full p-2 border" />

        <label className="block font-medium">Imagem principal</label>
        <input
          type="text"
          value={imagemNome}
          onChange={(e) => setImagemNome(e.target.value)}
          placeholder="Nome da imagem principal (ex: capa.jpg)"
          className="w-full p-2 border"
        />

        <div className="space-y-2">
          <h3 className="font-semibold">Galeria</h3>
          {galeria.map((img, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={img.url}
                onChange={(e) => atualizarGaleria(index, "url", e.target.value)}
                placeholder="Nome da imagem (ex: galeria1.jpg)"
                className="p-2 border"
              />
              <input
                value={img.descricao}
                onChange={(e) => atualizarGaleria(index, "descricao", e.target.value)}
                placeholder="Descrição"
                className="flex-1 p-2 border"
              />
            </div>
          ))}
          <button type="button" onClick={adicionarGaleria} className="bg-blue-500 text-white px-4 py-2 rounded">
            Adicionar Imagem
          </button>
        </div>

        <label className="block font-medium">Resumo</label>
        <textarea
          value={resumo}
          onChange={(e) => setResumo(e.target.value)}
          placeholder="Resumo da notícia"
          rows={4}
          className="w-full p-2 border"
        />

        <label className="block font-medium">Conteúdo completo</label>
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder="Conteúdo completo"
          rows={10}
          className="w-full p-2 border"
        />

        <label className="block font-medium">Data</label>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data (ex: 07/04/2025)"
          className="w-full p-2 border"
        />

        <label className="block font-medium">Autor</label>
        <input value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Nome do autor" className="w-full p-2 border" />

        <label className="block font-medium">Imagem do autor</label>
        <input
          type="text"
          value={autorImagemNome}
          onChange={(e) => setAutorImagemNome(e.target.value)}
          placeholder="Nome da imagem do autor (ex: autor.jpg)"
          className="w-full p-2 border"
        />

        <label className="block font-medium">Categoria</label>
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" className="w-full p-2 border" />

        <label className="block font-medium">Tags</label>
        <input
          value={tags.join(", ")}
          onChange={(e) => setTags(e.target.value.split(",").map((tag) => tag.trim()))}
          placeholder="Tags separadas por vírgula"
          className="w-full p-2 border"
        />

        <label className="block font-medium">Endereço</label>
        <input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" className="w-full p-2 border" />

        <label className="block font-medium">Latitude</label>
        <input type="number" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} placeholder="Latitude" className="w-full p-2 border" />

        <label className="block font-medium">Longitude</label>
        <input type="number" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} placeholder="Longitude" className="w-full p-2 border" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editandoId ? "Atualizar Notícia" : "Salvar Notícia"}
        </button>
      </form>

      <div className="pt-8 border-t">
        <h2 className="text-lg font-semibold mb-4">Notícias Cadastradas</h2>
        {noticias.length === 0 && <p className="text-sm text-zinc-500">Nenhuma notícia cadastrada.</p>}
        <ul className="space-y-2">
          {noticias.map((noticia) => (
            <li key={noticia.id} className="flex justify-between items-center bg-zinc-100 p-2 rounded">
              <span>{noticia.titulo}</span>
              <div className="flex gap-2">
                <button onClick={() => editarNoticia(noticia.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Editar
                </button>
                <button onClick={() => excluirNoticia(noticia.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminNoticiaForm;
