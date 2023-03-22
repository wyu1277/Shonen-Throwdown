import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUser } from "@/store/slices/userSlice";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import container from "@/styles/variants";

const Home = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useUser();

  const userData = useSelector((state) => {
    return state.user.user;
  });
  useEffect(() => {
    console.log("loading");
    setIsLoading(true);
    if (user) {
      dispatch(searchUser(user.email));
    }

    if (user && userData?.username === null) {
      router.push("/login/setup-account");
    }
    console.log(userData, "USERDATA");
    setIsLoading(false);
  }, [user]);

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <div>Hello, {user.email}</div>
          <p>Peppermint Patties Home Page</p>
        </>
      )}
    </motion.div>
  );
};

export const getServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // if (session && userData?.[0].username === null) {
  // 	return {
  // 		redirect: {
  // 			destination: '/login/setup-account',
  // 			permanent: false
  // 		}
  // 	};
  // }

  console.log(session);
  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
export default Home;
