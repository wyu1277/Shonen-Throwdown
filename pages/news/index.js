import Link from "next/link";
import { useRouter } from "next/router";
import NewsPages from "@/components/News/NewsPage";
import supabase from "@/lib/supabase";
import classes from "./index.module.css";

const NewsPage = ({ news }) => {
  const router = useRouter();
  return (
    <div className={classes.newsbody}>
      <NewsPages news={news} />
    </div>
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
