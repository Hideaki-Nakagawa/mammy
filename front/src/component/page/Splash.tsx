import React, { useEffect, useState } from "react";
import { Theme, makeStyles, createStyles, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { SplashLogo } from "../organisms";
import { Redirect } from "react-router";

/** Splash Style */
const useStyles = makeStyles((theme: Theme) => createStyles({}));

/** Splash コンポーネント */
const Splash: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary state hook */
  const [splash, setShow] = useState(true);

  /** @summary life cycle */
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="height:100vh, width:100vw"
    >
      {splash ? <SplashLogo /> : <Redirect to={"/login"} />}
    </Grid>
  );
};
export default Splash;
