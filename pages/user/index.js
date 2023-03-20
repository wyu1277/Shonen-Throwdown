import { useSelector } from "react-redux";

const UserPage = () => {
  const state = useSelector((state) => state);
  console.log(state);
  return <h1>UserPage</h1>;
};

export default UserPage;
