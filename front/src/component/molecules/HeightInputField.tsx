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

/** 身長入力フィールド コンポーネント */
const HeightInputField: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const diagnose = useContext(DiagnoseContext);

  return (
    <InputField
      addClass={classes}
      titleId="height_title"
      titleText="身長"
      id="height_input"
      unitText="cm"
      inputType="text"
      maxLength={6}
      areaLabel="height"
      fontType="fas"
      fontIconName="ruler"
      onChange={(newValue: string) => {
        diagnose.setHeight(newValue);
        diagnose.height = newValue;
      }}
      value={diagnose.height}
    />
  );
};
export default HeightInputField;
