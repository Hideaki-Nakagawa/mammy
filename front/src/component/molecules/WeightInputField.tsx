import React from "react";
import { InputField } from "../atoms";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sizeBig: {
      width: "15em",
    },
    sizeSmall: {
      width: "5em",
    },
  })
);

/** 体重入力フィールド コンポーネント */
const WeightInputField = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

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
    />
  );
};
export default WeightInputField;
