import React, { useCallback, useContext } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { LoginContext } from "../page/Login";
import { AuthContext } from "../../firebase/Auth";
import { EmailAddressInputField } from "../molecules";
import { ArrowBack } from "@material-ui/icons";

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

/** パスワード再設定フォーム コンポーネント */
const ResetPasswordForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary context hook api */
  const login = useContext(LoginContext);
  const auth = useContext(AuthContext);

  /** @summay Reset click */
  const handleResetClick = useCallback(async () => {
    try {
      await auth.resetPassword(login.emailAddress).then((result) => {
        if (result === "error") {
          throw "error resetPassword";
        }
      });
      handleBack();
      console.log("success resetPassword");
    } catch (error) {
      alert(error);
    }
  }, []);

  /** @summary Back click */
  const handleBack = useCallback(() => {
    const mode = "login";
    login.mode = mode;
    login.setMode(mode);
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <EmailAddressInputField />
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetClick}
        className={`${classes.margin} ${classes.withoutLabel} ${classes.btnSize}`}
      >
        送信
      </Button>
      <Link onClick={handleBack}>
        <ArrowBack />
        戻る
      </Link>
    </Grid>
  );
};
export default ResetPasswordForm;
