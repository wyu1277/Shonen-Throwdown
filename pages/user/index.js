import { useSelector } from "react-redux";
import AccountDetails from "@/components/Account/AccountDetails";
import classes from "../../styles/UserPage.module.css";
import { motion } from "framer-motion";
import container from "@/styles/variants";

const UserPage = () => {
  const user = useSelector((state) => {
    return state.user.user;
  });

  console.log("USERPAGE");
  console.log(user);
  return (
    <motion.div
      variant={container}
      initial="initial"
      animate="visible"
      exit="exit"
      className={classes.container}
    >
      {user && <AccountDetails user={user} />}
    </motion.div>
  );
};

export default UserPage;
