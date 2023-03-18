import { useRouter } from "next/router";
import classes from "./NewsPeek.module.css";

const NewsPeek = ({ article }) => {
  const router = useRouter();

  const newsClick = (id) => {
    router.push("/news/" + article.id);
  };

  return (
    <div onClick={newsClick} className={classes.newscontainer}>
      <h1>{article.heading}</h1>
      <p>{article.author}</p>
    </div>
  );
};

export default NewsPeek;
