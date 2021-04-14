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

/** 身長入力フィールド コンポーネント */
const HeightInputField = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

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
    />
  );
};
export default HeightInputField;
