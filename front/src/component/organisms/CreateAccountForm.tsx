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
import {
  EmailAddressInputField,
  PasswordInputField,
  UserIconInputField,
  UserNameInputField,
} from "../molecules";
import { LoginContext, LoginPageID } from "../page/Login";
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
    sizeBig: {
      width: "15em",
    },
    sizeSmall: {
      width: "7em",
    },
  })
);

/** アカウント作成フォーム コンポーネント */
const CreateAccountForm: React.FC = () => {
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
    login.isCreateAccount = false;
    login.setAccount(false);
  }, []);

  /** @summary Signup click */
  const handleSingupClick = useCallback(async () => {
    await auth.signup(login.emailAddress, login.password).then((result) => {
      switch (result) {
        case "success":
          break;
        case "failure":
        default:
          console.log("failure signup");
          return;
      }
    });
    await auth
      .updateProfile(login.displayName, login.photoURL)
      .then((result) => {
        switch (result) {
          case "success":
            break;
          case "failure":
          default:
            console.log("failure updateProfile");
            return;
        }
      });
    console.log("success createAccount");
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <EmailAddressInputField />
      <PasswordInputField />
      <UserNameInputField pageID={LoginPageID} />
      <UserIconInputField pageID={LoginPageID} />
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
          アカウント作成
        </Button>
      </Grid>
    </Grid>
  );
};
export default CreateAccountForm;
