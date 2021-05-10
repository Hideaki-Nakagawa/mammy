import React, { createContext } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Avatar,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { UserSettingForm } from "../organisms";
import { LayoutAfterLogin } from "../template";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

/** Setting Context */
export const SettingContext = createContext({
  userName: "",
} as {
  userName: string;
});

/** Setting コンポーネント */
const Setting: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  return (
    <LayoutAfterLogin>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="height:100%"
      >
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <UserSettingForm />
      </Grid>
    </LayoutAfterLogin>
  );
};
export default Setting;
