import React from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Avatar,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { LayoutAfterLogin } from "../template";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

/** PageID */
export const HomePageID = 2;

/** ホームページ コンポーネント */
const Home: React.FC = () => {
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
          <HomeIcon />
        </Avatar>
      </Grid>
    </LayoutAfterLogin>
  );
};
export default Home;
