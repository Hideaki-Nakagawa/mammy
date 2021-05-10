import React, { useContext, useState } from "react";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { DiagnoseContext } from "../page/Diagnose";

/** @summary style define*/
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

/** @summary 月齢選択 コンポーネント */
const MonthSelect: React.FC = () => {
  /** @summary state hook */
  const [myMounth, setMounth] = useState("");

  /** @summary context hook api */
  const diagnose = useContext(DiagnoseContext);

  /**
   * @summary state change
   * @details ステートを変更して、親要素に値を投げる
   */
  const handleChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    diagnose.month = newValue;
    setMounth(newValue);
  };

  /** @summary style hook api */
  const classes = useStyles();

  /** @summary 月齢の選択肢を作成 */
  const makeMonthItems = () => {
    const items = [];
    for (let month = 1; month <= 24; month++) {
      items.push(
        <MenuItem key={month} value={month}>
          {month}ヵ月
        </MenuItem>
      );
    }
    return items;
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <InputLabel id="age_select_label">月齢</InputLabel>
      <Select
        labelId="age_select_label"
        id="age_select"
        value={myMounth}
        onChange={handleChange}
        variant="standard"
      >
        {makeMonthItems()}
      </Select>
    </FormControl>
  );
};
export default MonthSelect;
