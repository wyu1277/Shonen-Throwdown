import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUser } from "@/store/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => {
    return state.auth.user;
  });
  const userState = useSelector((state) => {
    return state.user.user;
  });
  console.log(userAuth);
  console.log(userState);
  useEffect(() => {
    if (userAuth) {
      console.log(userAuth);
      dispatch(searchUser(userAuth.email));
    }
    if (userAuth && userState?.data?.length === 0) {
      router.push("/login/setup-account");
    }
  }, []);

  return (
    <>
      <p>Peppermint Patties Home Page</p>
    </>
  );
};

export default Home;
