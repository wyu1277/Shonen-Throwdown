import { useRouter } from "next/router";

const NewsPeek = ({ article }) => {
  const router = useRouter();

  const newsClick = (id) => {
    router.push("/news/" + article.id);
  };

  return (
    <div onClick={newsClick}>
      <h1>{article.heading}</h1>
      <p>{article.author}</p>
    </div>
  );
};

export default NewsPeek;
