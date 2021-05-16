import React, { useCallback, useContext } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { EmailAddressInputField, PasswordInputField } from "../molecules";
import { LoginContext } from "../page/Login";
import { AuthContext } from "../../firebase/Auth";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    iconMargin: {
      marginRight: theme.spacing(1),
    },
    btnSize: {
      width: "12rem",
    },
  })
);

/** ログインフォーム コンポーネント */
const LoginForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary history hook api */
  const history = useHistory();

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  /** @summary context hook api */
  const login = useContext(LoginContext);
  const auth = useContext(AuthContext);

  /** @summary Login click */
  const handleLoginClick = useCallback(() => {
    auth.signin(login.emailAddress, login.password).then((result) => {
      switch (result) {
        case "success":
          history.push("home");
          break;
        case "failure":
        default:
          break;
      }
    });
  }, []);

  /** @summary Signup click */
  const handleSingupClick = useCallback(() => {
    login.isCreateAccount = true;
    login.setAccount(true);
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <EmailAddressInputField />
      <PasswordInputField />
      <Grid
        container
        direction={matches ? "row" : "column"}
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginClick}
          className={`${classes.margin} ${classes.withoutLabel} ${classes.btnSize}`}
        >
          ログイン
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSingupClick}
          className={`${classes.margin} ${classes.withoutLabel} ${classes.btnSize}`}
        >
          新規作成
        </Button>
      </Grid>
    </Grid>
  );
};
export default LoginForm;
