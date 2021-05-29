import React, { useContext } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Grid,
  Avatar,
  Typography,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import {
  GenderRadioBtnGroup,
  HeightInputField,
  MonthSelect,
  WeightInputField,
} from "../molecules";
import { AlertDialog } from "../atoms";
import { DiagnoseContext } from "../page/Diagnose";
import { addDataset } from "../../firebase/firebase";
import growUpData from "../../resource/dataset/GrowUpData.json";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

/** 診断フォーム コンポーネント */
const DiagnoseForm: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const diagnose = useContext(DiagnoseContext);
  /** @summary firestoreにgrowUpdataを登録する */
  const addGrowUpData = () => {
    addDataset("growUpData", "new", growUpData);
  };
  /** @summary firestoreにgrowUpdataを更新する */
  const updateGrowUpData = () => {
    addDataset("growUpData", "update", growUpData);
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <GenderRadioBtnGroup />
      <MonthSelect />
      <HeightInputField />
      <WeightInputField />
      <AlertDialog
        btnName="診断"
        dlgTitle="診断結果"
        onClick={() => {
          return (
            <div>
              <div>性別 : {diagnose.gender} </div>
              <br />
              <div>月齢 : {diagnose.month} ヵ月</div>
              <br />
              <div>身長 : {diagnose.height} cm</div>
              <br />
              <div>体重 : {diagnose.weight} kg</div>
            </div>
          );
        }}
      />
    </Grid>
  );
};
export default DiagnoseForm;
