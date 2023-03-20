import classes from "./AccountSetupForm.module.css";

const AccountSetupForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <h1>Finish Setting Up Your Account to Continue 😃</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="fName">First Name:</label>
          <input
            name="fName"
            placeholder="First Name"
            className={classes.input}
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name:</label>
          <input
            name="lName"
            placeholder="Last Name"
            className={classes.input}
          />
        </div>
        <div>
          <label htmlFor="pnumber">Phone:</label>
          <input
            name="pnumber"
            placeholder="Phone"
            type="number"
            className={classes.input}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            className={classes.input}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AccountSetupForm;
