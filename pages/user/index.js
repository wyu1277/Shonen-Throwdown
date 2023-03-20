import { useSelector } from "react-redux";
import AccountDetails from "@/components/Account/AccountDetails";
import classes from "../../styles/UserPage.module.css";

const UserPage = () => {
  const user = useSelector((state) => {
    return state.user.user;
  });

  return (
    <div className={classes.container}>
      {user && <AccountDetails user={user} />}
    </div>
  );
};

export default UserPage;
