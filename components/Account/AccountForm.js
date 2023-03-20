import classes from "./AccountSetupForm.module.css";
import { useRef } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const AccountSetupForm = () => {
  const router = useRouter();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const result = await supabase
      .from("users")
      .insert([{ id: uuidv4(), fname, lname, phone, email }]);
    console.log(result);
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
            ref={fnameRef}
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name:</label>
          <input
            name="lName"
            placeholder="Last Name"
            className={classes.input}
            ref={lnameRef}
          />
        </div>
        <div>
          <label htmlFor="pnumber">Phone:</label>
          <input
            name="pnumber"
            placeholder="Phone"
            type="number"
            className={classes.input}
            ref={phoneRef}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            className={classes.input}
            ref={emailRef}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AccountSetupForm;
