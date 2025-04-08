import Head from 'next/head';

const Index = () => {
  return (
    <>
      <Head>
        <title>Routis - O que fazer em Rio Verde</title>
        <meta
          name="description"
          content="Descubra eventos, baladas, pontos turísticos e lugares para visitar em Rio Verde. Tudo o que você precisa saber para curtir seu final de semana."
        />
        <meta
          name="keywords"
          content="Rio Verde, o que fazer em Rio Verde, pontos turísticos, baladas, lugares para visitar, eventos em Rio Verde, final de semana em Rio Verde, vida noturna, turismo em Rio Verde"
        />
        <meta name="author" content="Routis" />
        <meta property="og:title" content="Routis - Explore Rio Verde" />
        <meta
          property="og:description"
          content="Guia completo com dicas do que fazer em Rio Verde: festas, eventos, lugares para visitar, turismo e lazer."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" /> {/* Substitua por sua imagem real */}
        <meta property="og:url" content="https://busca-rioverde.vercel.app/" />
        <link rel="canonical" href="https://busca-rioverde.vercel.app/" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Descubra Rio Verde</h1>
          <p className="text-xl text-gray-600">
            O que fazer em Rio Verde? Conheça os melhores pontos turísticos, baladas e eventos para aproveitar seu final de semana!
          </p>
          <p className="text-lg text-gray-500">
            Explore lugares incríveis e descubra tudo que Rio Verde tem a oferecer.
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
