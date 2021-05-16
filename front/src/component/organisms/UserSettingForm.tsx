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
import { SettingContext, SettingPageID } from "../page/Setting";
import { UserIconInputField, UserNameInputField } from "../molecules";
import { AuthContext } from "../../firebase/Auth";

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
      width: "7rem",
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

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  /** @summary apply button click */
  const handleApplyClick = useCallback(() => {
    setting.photoURL = "https://picsum.photos/200/300"; //仮
    auth.updateProfile(setting.displayName, setting.photoURL);
  }, []);

  /** @summary clear button click */
  const handleClearClick = useCallback(() => {
    setting.setName("");
    setting.setURL("");
    auth.updateProfile(setting.displayName, setting.photoURL);
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <UserNameInputField pageID={SettingPageID} />
      <UserIconInputField pageID={SettingPageID} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyClick}
          className={`${classes.margin} ${classes.withoutLabel} ${
            matches ? classes.sizeBig : classes.sizeSmall
          }`}
        >
          適用
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClearClick}
          className={`${classes.margin} ${classes.withoutLabel} ${
            matches ? classes.sizeBig : classes.sizeSmall
          }`}
        >
          クリア
        </Button>
      </Grid>
    </Grid>
  );
};
export default UserSettingForm;
