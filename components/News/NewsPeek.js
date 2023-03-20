import { useRouter } from "next/router";
import classes from "./NewsPeek.module.css";
import { motion } from "framer-motion";

const NewsPeek = ({ article }) => {
  const router = useRouter();

  const newsClick = (id) => {
    router.push("/news/" + article.id);
  };

  return (
    <motion.div
      whileHover={{
        boxShadow:
          "rgba(246, 170, 28, 0.10) 0px 54px 55px, rgba(246, 170, 28, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(246, 170, 28, 0.1) 0px 12px 13px, rgba(246, 170, 28, 0.1) 0px -3px 5px",
        scale: 1.05,
        height: 300,
      }}
      onClick={newsClick}
      className={classes.newscontainer}
    >
      <h1>{article.heading}</h1>
      <p>{article.author}</p>
      <h3 className={classes.expanded}>{article.tagline}</h3>
    </motion.div>
  );
};

export default NewsPeek;
