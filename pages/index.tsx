import Head from "next/head";
import ReadmeForm from "../components/ReadmeForm";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Markdown Readme Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ReadmeForm />
      </main>
    </div>
  );
};

export default Home;
