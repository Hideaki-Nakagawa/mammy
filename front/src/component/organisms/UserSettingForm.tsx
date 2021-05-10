import React, { useContext } from "react";
import { Theme, makeStyles, createStyles, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { SettingContext } from "../page/Setting";
import { UserNameInputField } from "../molecules";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);
/** ユーザ設定フォーム コンポーネント */
const UserSettingForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const setting = useContext(SettingContext);
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <UserNameInputField />
    </Grid>
  );
};
export default UserSettingForm;
