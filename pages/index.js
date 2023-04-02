"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUser } from "@/store/slices/userSlice";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import { fetchDeckCards } from "@/store/slices/deckSlice";
import styles from "../styles/home.module.css";
import Router from "next/router";

const Home = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useUser();

  const userData = useSelector((state) => {
    return state.user.user;
  });

  const loadState = useSelector((state) => {
    return state.user.loading;
  });

  const shouldReload = useSelector((state) => {
    return state.game.shouldReload;
  });

  useEffect(() => {
    // console.log("loading");

    if (shouldReload) {
      window.location.reload();
    }
    if (user) {
      dispatch(searchUser(user.id));
      dispatch(fetchDeckCards(user.id));
    }

    if (user && userData?.username === null) {
      router.push("/login/setup-account");
    }
    // console.log(userData, "USERDATA");
  }, [userInfo]);
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      {loadState ? (
        <div>loading</div>
      ) : (
        <div className={styles.outer}>
          <div className={styles.imageDiv}>
            <img
              className={styles.img}
              src="https://pbs.twimg.com/media/E4f3Ub7XMAkrBay?format=jpg&name=large"
            ></img>
          </div>
          <div className={styles.one}></div>
          <div className={styles.two}></div>
          <div className={styles.three}></div>
        </div>
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

  console.log(session, "getting session");
  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
export default Home;
