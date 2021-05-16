import React, { createContext, useState } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Avatar,
  Typography,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { CreateAccountForm, LoginForm } from "../organisms";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

/** PageID */
export const LoginPageID = 1;

/** Login Context */
export const LoginContext = createContext({
  isCreateAccount: false,
  emailAddress: "",
  password: "",
  displayName: "",
  photoURL: "",
} as {
  isCreateAccount: boolean;
  emailAddress: string;
  password: string;
  displayName: string;
  photoURL: string;
  setAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setURL: React.Dispatch<React.SetStateAction<string>>;
});

/** ログインページ コンポーネント */
const Login: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary state hook */
  const [isCreateAccount, setAccount] = useState(false);
  const [emailAddress, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("");
  const [photoURL, setURL] = useState("");

  return (
    <LoginContext.Provider
      value={{
        isCreateAccount,
        emailAddress,
        password,
        displayName,
        photoURL,
        setAccount,
        setAddress,
        setPassword,
        setName,
        setURL,
      }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="height:100%"
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account
        </Typography>
        {isCreateAccount ? <CreateAccountForm /> : <LoginForm />}
      </Grid>
    </LoginContext.Provider>
  );
};
export default Login;
