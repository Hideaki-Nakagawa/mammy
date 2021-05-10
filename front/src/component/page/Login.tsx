import React, { createContext } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Avatar,
  Typography,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { LoginForm } from "../organisms";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

/** Login Context */
export const LoginContext = createContext({
  emailAddress: "",
  password: "",
} as {
  emailAddress: string;
  password: string;
});

/** ログインページ コンポーネント */
const Login: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  return (
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
      <LoginForm />
    </Grid>
  );
};
export default Login;
