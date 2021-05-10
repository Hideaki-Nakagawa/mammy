import React from "react";
import { Theme, makeStyles, createStyles, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import {
  EmailAddressInputField,
  LoginButton,
  PasswordInputField,
  SingUpButton,
} from "../molecules";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

/** ログインフォーム コンポーネント */
const LoginForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <EmailAddressInputField />
      <PasswordInputField />
      <LoginButton />
      <SingUpButton />
    </Grid>
  );
};
export default LoginForm;
