import NewsDisplay from "@/components/News/NewsDisplay";
import { supabase } from "@/lib/supabase";
import classes from "./index.module.css";
import { motion } from "framer-motion";

const NewsDetails = ({ articleData }) => {
  return (
    <motion.div
      initial={{
        backgroundImage: "url('/images/capsulecorp.jpg')",
        backgroundSize: "cover",
        y: 500,
      }}
      animate={{
        y: 0,
      }}
    >
      <motion.div
        initial={{
          x: 0,
          y: -1000,
        }}
        animate={{ x: 0, y: 0 }}
      >
        <NewsDisplay props={articleData} />
      </motion.div>
    </motion.div>
  );
};

export const getStaticPaths = async () => {
  const response = await supabase.from("news").select("id");
  return {
    fallback: "blocking",
    paths: response.data.map((article) => {
      return {
        params: {
          newsId: article.id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const newsId = context.params.newsId;

  const response = await supabase.from("news").select().eq("id", newsId);

  const data = response.data;
  return {
    props: {
      articleData: data,
    },
    revalidate: 10,
  };
};

export default NewsDetails;
