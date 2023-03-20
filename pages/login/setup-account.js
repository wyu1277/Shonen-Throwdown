import AccountSetupForm from "@/components/Account/AccountForm";
import classes from "../../styles/setup-account.module.css";

const SetupAccountPage = () => {
  return (
    <div className={classes.container}>
      <AccountSetupForm />
    </div>
  );
};

export default SetupAccountPage;
