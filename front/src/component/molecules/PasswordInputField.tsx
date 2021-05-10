import React, { useContext } from "react";
import { InputField } from "../atoms";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { LoginContext } from "../page/Login";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sizeBig: {
      width: "30em",
    },
    sizeSmall: {
      width: "15em",
    },
  })
);

/** パスワード入力フィールド コンポーネント */
const PasswordInputField: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const login = useContext(LoginContext);

  return (
    <InputField
      addClass={classes}
      titleId="password_title"
      titleText="Password"
      id="password_input"
      unitText=""
      inputType="password"
      maxLength={50}
      areaLabel="password"
      fontType="fas"
      fontIconName="key"
      onChange={(newValue: string) => (login.password = newValue)}
    />
  );
};
export default PasswordInputField;
