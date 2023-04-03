import classes from "./AccountUpdateForm.module.css";
import { useRef } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/store/slices/userSlice";
import { useUser } from "@supabase/auth-helpers-react";

const AccountUpdateForm = (props) => {
  const dispatch = useDispatch();
  const user = useUser();
  const router = useRouter();
  const userState = useSelector((state) => {
    return state.user.user;
  });

  // console.log(userState, "USERSTATE");

  const fnameRef = useRef();
  const lnameRef = useRef();
  const phoneRef = useRef();
  const usernameRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    const phone = phoneRef.current.value;
    const username = usernameRef.current.value;
    const info = {
      id: user.id,
      fname,
      lname,
      phone,
      username,
    };
    dispatch(updateUser(info));
    props.setToggle(!props.toggle);
  };

  return (
    <div className={classes.container}>
      <h1>Update Account Info</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.field}>
          <label htmlFor="fName">First Name:</label>
          <input
            name="fName"
            placeholder="First Name"
            className={classes.input}
            ref={fnameRef}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="lName">Last Name:</label>
          <input
            name="lName"
            placeholder="Last Name"
            className={classes.input}
            ref={lnameRef}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="pnumber">Phone:</label>
          <input
            name="pnumber"
            placeholder="Phone"
            type="number"
            className={classes.input}
            ref={phoneRef}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            placeholder="Username"
            type="text"
            className={classes.input}
            ref={usernameRef}
          />
        </div>

        <button>Update</button>
      </form>
    </div>
  );
};

export default AccountUpdateForm;
