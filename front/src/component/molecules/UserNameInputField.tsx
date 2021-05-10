import React, { useContext } from "react";
import { InputField } from "../atoms";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { SettingContext } from "../page/Setting";

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

/** ユーザ名入力フィールド コンポーネント */
const UserNameInputField: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const setting = useContext(SettingContext);

  return (
    <InputField
      addClass={classes}
      titleId="user_name_title"
      titleText="UserName"
      id="user_name_input"
      unitText=""
      inputType="text"
      maxLength={50}
      areaLabel="username"
      fontType="fas"
      fontIconName="user"
      onChange={(newValue: string) => (setting.userName = newValue)}
    />
  );
};
export default UserNameInputField;
