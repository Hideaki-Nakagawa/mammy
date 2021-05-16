import React, { createContext, useState } from "react";
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

/** PageID */
export const DiagnosePageID = 3;

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
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
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

  /** @summary state hook */
  const [gender, setGender] = useState("");
  const [month, setMonth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <DiagnoseContext.Provider
      value={{
        gender,
        month,
        height,
        weight,
        setGender,
        setMonth,
        setHeight,
        setWeight,
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
            <LocalHospitalIcon />
          </Avatar>
          <DiagnoseForm />
        </Grid>
      </LayoutAfterLogin>
    </DiagnoseContext.Provider>
  );
};
export default Diagnose;
