import NewsPeek from "./NewsPeek";
import { useRouter } from "next/router";
import classes from "./NewsPage.module.css";

const NewsPages = ({ news }) => {
  return (
    <div className={classes.newspagecontainer}>
      {news.map((article) => {
        return <NewsPeek key={article.id} article={article} />;
      })}
    </div>
  );
};

export default NewsPages;
