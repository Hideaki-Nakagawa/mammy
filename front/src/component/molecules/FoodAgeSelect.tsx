import React, { useState } from "react";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

/** @summary style define*/
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

/** @summary 離乳食時期選択 コンポーネント */
const FoodAgeSelect: React.FC = () => {
  /** @summary state hook */
  const [myAge, setAge] = useState("");

  /**
   * @summary state change
   * @details ステートを変更して、親要素に値を投げる
   */
  const handleChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setAge(newValue);
  };

  /** @summary style hook api */
  const classes = useStyles();

  /** @summary 離乳食時期の選択肢を作成 */
  const makeMonthItems = () => {
    /** 選択肢 型宣言 */
    type Item = {
      value: number;
      label: string;
    };
    /** 選択肢オブジェクト */
    const selItemObj: Item[] = [
      { value: 1, label: "ゴックン期 (5～6ヵ月)" },
      { value: 2, label: "モグモグ期 (7～8ヵ月)" },
      { value: 3, label: "カミカミ期 (9～11ヵ月)" },
      { value: 4, label: "パクパク期 (1～1才6ヵ月)" },
    ];
    const items: JSX.Element[] = [];
    selItemObj.map((output, index) => {
      items.push(
        <MenuItem key={index} value={output.value}>
          {output.label}
        </MenuItem>
      );
    });
    return items;
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <InputLabel id="age_select_label">離乳食時期</InputLabel>
      <Select
        labelId="age_select_label"
        id="age_select"
        value={myAge}
        onChange={handleChange}
        variant="standard"
      >
        {makeMonthItems()}
      </Select>
    </FormControl>
  );
};

export default FoodAgeSelect;
