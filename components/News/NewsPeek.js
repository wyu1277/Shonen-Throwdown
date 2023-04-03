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
      // animate={{ backgroundImage: "url(" }}
      whileHover={{
        scale: 1.05,
        height: 300,
        border: "none",
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backgroundBlendMode: "darken",
      }}
      onClick={newsClick}
      className={classes.newscontainer}
    >
      <motion.h1
        whileHover={{
          opacity: 1,
        }}
      >
        {article.heading}
      </motion.h1>
      <p>{article.author}</p>
      <h3 className={classes.expanded}>{article.tagline}</h3>
    </motion.div>
  );
};

export default NewsPeek;
