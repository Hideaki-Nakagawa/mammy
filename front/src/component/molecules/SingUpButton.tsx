import React, { useContext } from "react";
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
 * アカウント作成ボタン コンポーネント
 */
const SingUpButton: React.FC = () => {
  /** @summary style hook api */
  const classes = useStyles();

  /** @summary context hook api */
  const login = useContext(LoginContext);
  const auth = useContext(AuthContext);

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  /** @summary Signup click */
  const handleClick = () => {
    auth.signup(login.emailAddress, login.password).then(() => {
      console.log("account create");
    });
  };

  return (
    <div
      className={`${classes.margin} ${classes.withoutLabel} ${
        matches ? classes.sizeBig : classes.sizeSmall
      }`}
    >
      <Button variant="contained" color="primary" onClick={handleClick}>
        アカウント作成
      </Button>
    </div>
  );
};

export default SingUpButton;
