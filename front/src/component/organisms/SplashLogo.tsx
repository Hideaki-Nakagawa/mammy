import React from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  useMediaQuery,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sizeBig: {
      height: "auto",
      width: "35%",
    },
    sizeSmall: {
      height: "auto",
      width: "70%",
    },
  })
);

/** ロゴ コンポーネント */
const SplashLogo = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <img
      src="../../resource/img/logo.png"
      className={`${matches ? classes.sizeBig : classes.sizeSmall}`}
      alt=""
    />
  );
};
export default SplashLogo;
