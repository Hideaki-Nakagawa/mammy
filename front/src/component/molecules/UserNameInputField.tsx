import React, { useContext } from "react";
import { InputField } from "../atoms";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { SettingContext, SettingPageID } from "../page/Setting";
import { LoginContext, LoginPageID } from "../page/Login";

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

/**
 * 引数
 */
type Props = {
  pageID: number;
};

/** ユーザ名入力フィールド コンポーネント */
const UserNameInputField = (props: Props) => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  /** @summary context hook api */
  const setting = useContext(SettingContext);
  const login = useContext(LoginContext);

  /** @summay pageに応じたonChange */
  const handleChange = (value: string) => {
    switch (props.pageID) {
      case SettingPageID:
        setting.setName(value);
        setting.displayName = value;
        break;
      case LoginPageID:
        login.setName(value);
        login.displayName = value;
        break;
      default:
        break;
    }
  };

  /** @summary pageに応じたvalueの値を返す */
  const selectValue = (): string => {
    switch (props.pageID) {
      case SettingPageID:
        return setting.displayName;
      case LoginPageID:
        return login.displayName;
      default:
        return "";
    }
  };

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
      onChange={(newValue: string) => {
        handleChange(newValue);
      }}
      value={selectValue()}
    />
  );
};
export default UserNameInputField;
