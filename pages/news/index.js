import { useRouter } from "next/router";
import NewsPages from "@/components/News/NewsPage";
import supabase from "@/lib/supabase";
import classes from "./index.module.css";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import { useState } from "react";

const NewsPage = ({ news }) => {
  const router = useRouter();
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
      className={classes.newsbody}
    >
      <NewsPages news={news} />
    </motion.div>
  );
};

export const getStaticProps = async () => {
  const response = await supabase.from("news").select("*");

  return {
    props: {
      news: response.data,
    },
    revalidate: 10,
  };
};

export default NewsPage;
