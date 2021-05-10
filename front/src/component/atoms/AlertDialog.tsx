import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

/**
 * 引数
 */
type Props = {
  btnName: string;
  dlgTitle: string;
  onClick: any;
};

/**
 * モーダルダイアログ コンボーネント
 * @param props : Prpps
 */
const AlertDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");

  /** ダイアログを開く */
  const handleOpen = () => {
    const result: string = props.onClick();
    setResult(result);
    setOpen(true);
  };

  /** ダイアログをクローズ */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {props.btnName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dlgTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {result}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
