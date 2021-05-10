import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router";
import {
  Theme,
  createStyles,
  makeStyles,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { AuthContext } from "../../firebase/Auth";
import { LoginContext } from "../page/Login";

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
const LoginButton: React.FC = () => {
  /** @summary style hook api */
  const classes = useStyles();

  /** @summary context hook api */
  const login = useContext(LoginContext);
  const auth = useContext(AuthContext);

  /** @summary history hook api */
  const history = useHistory();

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  /** @summary Login click */
  const handleClick = useCallback(() => {
    auth.signin(login.emailAddress, login.password).then(() => {
      if (auth.currentUser) history.push("home");
    });
  }, []);

  return (
    <div
      className={`${classes.margin} ${classes.withoutLabel} ${
        matches ? classes.sizeBig : classes.sizeSmall
      }`}
    >
      <Button variant="contained" color="primary" onClick={handleClick}>
        ログイン
      </Button>
    </div>
  );
};

export default LoginButton;
