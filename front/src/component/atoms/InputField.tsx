import React, { useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  useMediaQuery,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-common-types";

/** @summary style define*/
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
  })
);

/**
 * 引数
 */
type Props = {
  id: string;
  titleId: string;
  titleText: string;
  unitText: string;
  inputType: string;
  maxLength: number;
  areaLabel: string;
  fontType: IconPrefix;
  fontIconName: IconName;
  addClass: ClassNameMap;
};

/**
 * インプトフィールド コンポーネント
 * @param props : Prpps
 */
const InputField = (props: Props) => {
  /** @summary state hook */
  const [myText, setText] = useState("");

  /**
   * @summary state change
   * @details ステートを変更して、親要素に値を投げる
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setText(newValue);
  };

  /** @summary style hook api */
  const classes = useStyles();

  /** @summary media query */
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <FormControl
      className={`${classes.margin} ${classes.withoutLabel} ${
        matches ? props.addClass.sizeBig : props.addClass.sizeSmall
      }`}
    >
      <FormHelperText id={props.titleId}>{props.titleText}</FormHelperText>
      <Input
        id={props.id}
        value={myText}
        type={props.inputType}
        onChange={handleChange}
        startAdornment={
          <FontAwesomeIcon
            icon={[props.fontType, props.fontIconName]}
            className={classes.iconMargin}
          />
        }
        endAdornment={
          <InputAdornment position="end">{props.unitText}</InputAdornment>
        }
        aria-describedby={props.titleId}
        inputProps={{
          maxLength: props.maxLength,
          "aria-label": props.areaLabel,
        }}
      />
    </FormControl>
  );
};

export default InputField;
