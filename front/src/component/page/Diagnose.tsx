import React, { createContext } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Avatar,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { DiagnoseForm } from "../organisms";
import { LayoutAfterLogin } from "../template";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

/** Diagnose Context */
export const DiagnoseContext = createContext({
  gender: "",
  month: "",
  height: "",
  weight: "",
} as {
  gender: string;
  month: string;
  height: string;
  weight: string;
});

/** Diagnose Style */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

/** Diagnose page コンポーネント */
const Diagnose: React.FC = () => {
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
          <LocalHospitalIcon />
        </Avatar>
        <DiagnoseForm />
      </Grid>
    </LayoutAfterLogin>
  );
};
export default Diagnose;
