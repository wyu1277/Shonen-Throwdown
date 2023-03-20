import NewsDisplay from "@/components/News/NewsDisplay";
import supabase from "@/lib/supabase";

const NewsDetails = ({ articleData }) => {
  return <NewsDisplay props={articleData} />;
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
