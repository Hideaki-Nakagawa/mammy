import React, { useEffect, useState } from "react";
import { Theme, makeStyles, createStyles, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { LoginForm, SplashLogo } from "../organisms";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

/** ログインページ コンポーネント */
const Login = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary state hook */
  const [splash, setShow] = useState(true);

  /** @summary life cycle */
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="height:100%"
    >
      {splash ? <SplashLogo /> : <LoginForm />}
    </Grid>
  );
};
export default Login;
