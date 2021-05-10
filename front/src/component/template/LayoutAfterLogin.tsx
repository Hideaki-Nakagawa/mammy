import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { Header } from "../organisms";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: {
      ...theme.mixins.toolbar,
      flexGrow: 1,
    },
  })
);

/** ログイン後のレイアウト コンポーネント */
const LayoutAfterLogin: React.FC = ({ children }) => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  return (
    <>
      <Header />
      <div className={classes.offset} />
      {children}
    </>
  );
};
export default LayoutAfterLogin;
