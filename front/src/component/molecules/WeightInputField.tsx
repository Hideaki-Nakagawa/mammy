import React, { useContext } from "react";
import { InputField } from "../atoms";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { DiagnoseContext } from "../page/Diagnose";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sizeBig: {
      width: "15rem",
    },
    sizeSmall: {
      width: "7.5rem",
    },
    overrideInput: {
      textAlign: "center",
    },
  })
);

/** 体重入力フィールド コンポーネント */
const WeightInputField: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const diagnose = useContext(DiagnoseContext);

  return (
    <InputField
      addClass={classes}
      titleId="weight_title"
      titleText="体重"
      id="weight_input"
      unitText="kg"
      inputType="text"
      maxLength={4}
      areaLabel="weight"
      fontType="fas"
      fontIconName="weight"
      onChange={(newValue: string) => {
        diagnose.setWeight(newValue);
        diagnose.weight = newValue;
      }}
      value={diagnose.weight}
    />
  );
};
export default WeightInputField;
