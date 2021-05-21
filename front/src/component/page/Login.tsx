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
import { CreateAccountForm, LoginForm, ResetPasswordForm } from "../organisms";
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
  mode: "",
  emailAddress: "",
  password: "",
  displayName: "",
  photoURL: "",
} as {
  mode: string;
  emailAddress: string;
  password: string;
  displayName: string;
  photoURL: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
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
  const [mode, setMode] = useState("");
  const [emailAddress, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("");
  const [photoURL, setURL] = useState("");

  /**
   * @summary 現在の表示モードに応じたコンポーネントを返す
   * @returns 表示内容のコンポーネント
   */
  const selectMode = () => {
    switch (mode) {
      default:
      case "login":
        return <LoginForm />;
      case "create":
        return <CreateAccountForm />;
      case "reset":
        return <ResetPasswordForm />;
    }
  };

  return (
    <LoginContext.Provider
      value={{
        mode,
        emailAddress,
        password,
        displayName,
        photoURL,
        setMode,
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
        {selectMode()}
      </Grid>
    </LoginContext.Provider>
  );
};
export default Login;
