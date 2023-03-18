import NewsPeek from "./NewsPeek";
import { useRouter } from "next/router";

const NewsPages = ({ news }) => {
  return (
    <div>
      {news.map((article) => {
        return <NewsPeek key={article.id} article={article} />;
      })}
    </div>
  );
};

export default NewsPages;
