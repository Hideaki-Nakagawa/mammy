import React, { useState } from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
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
  dlgTitle: string;
  dlgContent: string;
  onClickOK: any;
};

/**
 * 確認ダイアログ コンボーネント
 * @param props : Props
 */
const ConfirmDialog = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /** ダイアログを開く */
  const handleOpen = () => {
    setOpen(true);
  };

  /** ダイアログをクローズ */
  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    props.onClickOK();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={`${classes.margin} ${classes.withoutLabel} ${classes.btnSize}`}
      >
        {props.btnName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{props.dlgTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {props.dlgContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleOK} variant="outlined" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
