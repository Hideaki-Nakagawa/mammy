import React, { useContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AccountBox,
  ChildFriendly,
  Email,
  ExitToApp,
  Fastfood,
  Home,
  LocalHospital,
  Settings,
} from "@material-ui/icons";
import { AuthContext } from "../../firebase/Auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    userIcon: {
      width: "1rem",
      height: "1rem",
    },
  })
);

/**
 * @summary ヘッダー コンポーネント
 */
const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  /** @summary state hook api */
  const [open, setOpen] = useState(false);

  /** @summary history hook api */
  const history = useHistory();
  const location = useLocation();

  /** @summary context hook api */
  const auth = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * 現在のページURLから、ページ名を取得する
   */
  const getPageTitle = () => {
    const url = location.pathname;
    let title = "";
    switch (url) {
      case "/home":
        title = "ホーム";
        break;
      case "/baby":
        break;
      case "/diagnose":
        title = "診断";
        break;
      case "/eat":
        break;
      case "/setting":
        title = "設定";
        break;
      case "/contact":
        break;
      default:
        break;
    }
    return (
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    );
  };

  /**
   * Drawerに表示するアイコンを取得する
   * @param[in] key : アイコンキー
   * @returns : Material Icon Node
   */
  const getIconName = (key: string): React.ReactNode => {
    let icon: React.ReactNode;
    switch (key) {
      case "Home":
        icon = <Home />;
        break;
      case "Baby":
        icon = <ChildFriendly />;
        break;
      case "Diagnose":
        icon = <LocalHospital />;
        break;
      case "Eat":
        icon = <Fastfood />;
        break;
      case "Setting":
        icon = <Settings />;
        break;
      case "Contact":
        icon = <Email />;
        break;
      case "Logout":
        icon = <ExitToApp />;
        break;
    }
    return icon;
  };

  /**
   * Drawerのキーを押したときのアクション
   * @param[in] key : アイコンキー
   */
  const handleClickAction = (key: string) => {
    switch (key) {
      case "Home":
        history.push("/home");
        break;
      case "Baby":
        break;
      case "Diagnose":
        history.push("/diagnose");
        break;
      case "Eat":
        break;
      case "Setting":
        history.push("/setting");
        break;
      case "Contact":
        break;
      case "Logout":
        auth.signout().then(() => {
          history.push("/login");
        });
        break;
    }
  };

  /**
   * @summary AuthContextからログイン中のユーザ画像を取得する関数
   * @details displayNameを表示、設定がなければemailから表示
   */
  const getLoginUserIcon = () => {
    const userIcon: JSX.Element[] = [];
    if (auth.currentUser) {
      if (auth.currentUser.photoURL) {
        userIcon.push(
          <img src={auth.currentUser.photoURL} className={classes.userIcon} />
        );
      } else {
        userIcon.push(<AccountBox />);
      }
    }
    return userIcon;
  };

  /**
   * @summary AuthContextからログイン中のユーザ名を取得する関数
   * @details displayNameを表示、設定がなければemailから表示
   */
  const getLoginUserName = (): string => {
    let userName = "null";
    if (auth.currentUser) {
      userName = auth.currentUser.displayName
        ? auth.currentUser.displayName
        : "none";
    }
    return userName;
  };

  return (
    <div className={classes.root}>
      {auth.currentUser ? "" : <Redirect to={"login"} />}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {getPageTitle()}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {getLoginUserIcon()}
          {getLoginUserName()}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home", "Baby", "Diagnose", "Eat"].map((text, index) => (
            <ListItem button onClick={() => handleClickAction(text)} key={text}>
              <ListItemIcon>{getIconName(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Setting", "Contact", "Logout"].map((text, index) => (
            <ListItem button onClick={() => handleClickAction(text)} key={text}>
              <ListItemIcon>{getIconName(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
