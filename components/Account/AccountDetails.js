import classes from "./AccountDetails.module.css";

const AccountDetails = ({ user }) => {
  return (
    <div className={classes.container}>
      <h1> Account Details </h1>
      <p>
        {user.fname} {user.lname}
      </p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
};

export default AccountDetails;
