import React from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  useMediaQuery,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import splash from "../../resource/images/logo.png";

/** Splash logo Style */
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

/** Splash logo コンポーネント */
const SplashLogo: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <div>
      <img
        src={splash}
        className={`${matches ? classes.sizeBig : classes.sizeSmall}`}
      />
    </div>
  );
};
export default SplashLogo;
