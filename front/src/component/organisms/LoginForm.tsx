import React from "react";
import { Theme, makeStyles, createStyles, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import {
  EmailAddressInputField,
  LoginButton,
  PasswordInputField,
} from "../molecules";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

/** ログインフォーム コンポーネント */
const LoginForm = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <EmailAddressInputField />
      <PasswordInputField />
      <LoginButton />
    </Grid>
  );
};
export default LoginForm;
