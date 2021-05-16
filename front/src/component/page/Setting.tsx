import React, { createContext, useState } from "react";
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

/** PageID */
export const SettingPageID = 4;

/** Setting Context */
export const SettingContext = createContext({
  displayName: "",
  photoURL: "",
} as {
  displayName: string;
  photoURL: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setURL: React.Dispatch<React.SetStateAction<string>>;
});

/** Setting コンポーネント */
const Setting: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary state hook */
  const [displayName, setName] = useState("");
  const [photoURL, setURL] = useState("");

  return (
    <SettingContext.Provider
      value={{
        displayName,
        photoURL,
        setName,
        setURL,
      }}
    >
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
    </SettingContext.Provider>
  );
};
export default Setting;
