import React, { useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  FormControl,
  useMediaQuery,
  Button,
} from "@material-ui/core";

/** @summary style define*/
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
    sizeBig: {
      width: "15em",
    },
    sizeSmall: {
      width: "7em",
    },
  })
);

/**
 * ログインボタン コンポーネント
 */
const LoginButton = () => {
  /** @summary Loginボタン click */
  const handleClick = () => {
    console.log("click");
  };

  /** @summary style hook api */
  const classes = useStyles();

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <FormControl
      className={`${classes.margin} ${classes.withoutLabel} ${
        matches ? classes.sizeBig : classes.sizeSmall
      }`}
    >
      <Button variant="contained" color="primary" onClick={handleClick}>
        ログイン
      </Button>
    </FormControl>
  );
};

export default LoginButton;
