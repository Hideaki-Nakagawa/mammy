import React, { useCallback, useContext } from "react";
import { Theme, makeStyles, createStyles, Grid, Link } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import {
  EmailAddressInputField,
  PasswordInputField,
  UserIconInputField,
  UserNameInputField,
} from "../molecules";
import { LoginContext, LoginPageID } from "../page/Login";
import { AuthContext } from "../../firebase/Auth";
import { ArrowBack } from "@material-ui/icons";
import { Notify } from "../atoms";
import { AlertProps } from "@material-ui/lab/Alert";

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

/** アカウント作成フォーム コンポーネント */
const CreateAccountForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary context hook api */
  const login = useContext(LoginContext);
  const auth = useContext(AuthContext);

  /**
   * @summary Signup click
   * @details アカウントを作成とプロファイルの設定を行う
   */
  const handleSingupClick = useCallback(async () => {
    try {
      await auth
        .signup(login.emailAddress, login.password)
        .then((result: string) => {
          if (result === "error") {
            throw "error - signup";
          }
        });
      await auth
        .updateProfile(login.displayName, login.photoURL)
        .then((result: string) => {
          if (result === "error") {
            throw "error - updateProfile";
          }
        });
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  }, []);

  /**
   * @summary Back click
   * @details 戻るボタンを押したとき
   */
  const handleBack = useCallback(() => {
    const mode = "login";
    login.mode = mode;
    login.setMode(mode);
  }, []);

  const alertProps: AlertProps = {
    severity: "success",
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <EmailAddressInputField />
      <PasswordInputField />
      <UserNameInputField pageID={LoginPageID} />
      <UserIconInputField pageID={LoginPageID} />
      <Notify
        btnName="アカウント作成"
        dlgContent="アカウントの作成に成功しました。"
        onClick={handleSingupClick}
        alertProps={alertProps}
      />
      <Link onClick={handleBack}>
        <ArrowBack />
        戻る
      </Link>
    </Grid>
  );
};
export default CreateAccountForm;
