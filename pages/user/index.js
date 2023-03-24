import { useSelector, useDispatch } from "react-redux";
import AccountDetails from "@/components/Account/AccountDetails";
import classes from "../../styles/UserPage.module.css";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import { useState, useEffect } from "react";
import AccountUpdateForm from "@/components/Account/AccountUpdateForm";
import { searchUser } from "@/store/slices/userSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => {
    return state.user.user;
  });

  const loadState = useSelector((state) => {
    return state.user.loading;
  });

  useEffect(() => {
    // console.log("loading");
    if (user) {
      dispatch(searchUser(user.id));
    }
  }, [toggle]);

  return (
    <motion.div
      variant={container}
      initial="initial"
      animate="visible"
      exit="exit"
      className={classes.container}
    >
      {loadState === true && <div>Loading</div>}
      {loadState === false && toggle === false && (
        <AccountDetails setToggle={setToggle} toggle={toggle} user={user} />
      )}
      {toggle && <AccountUpdateForm setToggle={setToggle} toggle={toggle} />}
    </motion.div>
  );
};

export default UserPage;
