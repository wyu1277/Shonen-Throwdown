import classes from "./AccountDetails.module.css";
import { useEffect } from "react";

const AccountDetails = (props) => {
  return (
    <div className={classes.container}>
      <h1> Account Details </h1>
      <p>
        {props.user.fname} {props.user.lname}
      </p>
      <p>Username: {props.user.username}</p>
      <p>Email: {props.user.email}</p>
      <p>Phone: {props.user.phone}</p>
      <button
        onClick={() => {
          console.log(props.toggle);
          props.setToggle(!props.toggle);
        }}
      >
        Update Your Info!
      </button>
    </div>
  );
};

export default AccountDetails;
