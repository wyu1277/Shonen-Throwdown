import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classes from "../../styles/LoginPage.module.css";
import { motion } from "framer-motion";
import container from "@/styles/variants";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("cards").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
    if (user) router.push("/");
  }, [user]);

  if (!user)
    return (
      <motion.div
        variants={container}
        initial="initial"
        animate="visible"
        exit="exit"
        className={classes.auth}
      >
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          socialLayout="horizontal"
        />
      </motion.div>
    );

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </motion.div>
  );
};

export default LoginPage;
