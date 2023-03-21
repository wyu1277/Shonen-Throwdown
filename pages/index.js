import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUser } from "@/store/slices/userSlice";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Home = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useUser();

  const userData = useSelector((state) => {
    return state.user.user;
  });
  useEffect(() => {
    if (user) {
      dispatch(searchUser(user.email));
    }

    if (user && userData?.[0]?.username === null) {
      router.push("/login/setup-account");
    }
  }, [user]);

  return (
    <>
      <div>Hello, {user.email}</div>
      <p>Peppermint Patties Home Page</p>
    </>
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

  if (session && userData?.[0].username === null) {
    return {
      redirect: {
        destination: "/login/setup-account",
        permanent: false,
      },
    };
  }

  console.log(session);
  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
export default Home;
