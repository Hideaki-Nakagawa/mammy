import React, { useState } from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Snackbar,
  Theme,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
    btnSize: {
      width: "12rem",
    },
  })
);

/**
 * 引数
 */
type Props = {
  btnName: string;
  dlgContent: string;
  onClick: any;
  alertProps: AlertProps;
};

/**
 * 通知(Toast) コンボーネント
 * @param props : Props
 */
const Notify = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /**
   * ボタンをクリックしたときのアクション
   * @details 引数で与えらえたアクションを行い、成功した場合は通知
   */
  const handleClick = () => {
    props.onClick().then((result: string) => {
      result === "success" && setOpen(true);
    });
  };

  /**
   * 通知ウィンドウ閉じる処理
   * @param event
   * @param reason
   * @returns
   */
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={`${classes.margin} ${classes.withoutLabel} ${classes.btnSize}`}
      >
        {props.btnName}
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} {...props.alertProps}>
          {props.dlgContent}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notify;
