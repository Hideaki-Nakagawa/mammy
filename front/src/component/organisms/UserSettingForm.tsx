import React, { useCallback, useContext } from "react";
import { Theme, makeStyles, createStyles, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { SettingContext, SettingPageID } from "../page/Setting";
import { UserIconInputField, UserNameInputField } from "../molecules";
import { AuthContext } from "../../firebase/Auth";
import { useHistory } from "react-router";
import { ConfirmDialog, Notify } from "../atoms";
import { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    btnSize: {
      width: "12rem",
    },
  })
);

/** userProfile Setting form コンポーネント */
const UserSettingForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary context hook api */
  const setting = useContext(SettingContext);
  const auth = useContext(AuthContext);

  /** @summary history hook api */
  const history = useHistory();

  /** @summary apply button click */
  const handleApplyClick = useCallback(async () => {
    setting.photoURL = "https://picsum.photos/200/300"; //仮
    try {
      await auth
        .updateProfile(setting.displayName, setting.photoURL)
        .then((result: string) => {
          if (result === "error") {
            throw "error - updataProfie";
          }
        });
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  }, []);

  /** @summary clear button click */
  const handleClearClick = useCallback(async () => {
    setting.setName("");
    setting.setURL("");
    try {
      await auth
        .updateProfile(setting.displayName, setting.photoURL)
        .then((result: string) => {
          if (result === "error") {
            throw "error - clearProfie";
          }
        });
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  }, []);

  /** @summay user delete button click */
  const handleDeleteClick = useCallback(() => {
    auth.deleteUser();
    history.push("/login");
  }, []);

  const alertProps: AlertProps = {
    severity: "success",
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <UserNameInputField pageID={SettingPageID} />
      <UserIconInputField pageID={SettingPageID} />
      <Notify
        btnName="適用"
        dlgContent="アカウント情報の更新に成功しました。"
        onClick={handleApplyClick}
        alertProps={alertProps}
      />
      <Notify
        btnName="クリア"
        dlgContent="アカウント情報のクリアに成功しました。"
        onClick={handleClearClick}
        alertProps={alertProps}
      />
      <ConfirmDialog
        btnName="アカウント削除"
        dlgTitle="注意"
        dlgContent="本当にアカウントを削除しますか？"
        onClickOK={handleDeleteClick}
      />
    </Grid>
  );
};
export default UserSettingForm;
