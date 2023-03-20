import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUser } from "@/store/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  console.log(user);

  useEffect(() => {
    if (user) {
      dispatch(searchUser(user.email));
    }
  }, []);
  return (
    <>
      <p>Peppermint Patties Home Page</p>
    </>
  );
};

export default Home;
