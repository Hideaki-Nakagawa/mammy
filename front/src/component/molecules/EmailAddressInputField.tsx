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

/** メールアドレス入力フィールド コンポーネント */
const EmailAddressInputField: React.FC = () => {
  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();
  /** @summary context hook api */
  const login = useContext(LoginContext);

  return (
    <InputField
      addClass={classes}
      titleId="mail_address_title"
      titleText="E-mail"
      id="mail_address_input"
      unitText=""
      inputType="text"
      maxLength={50}
      areaLabel="email"
      fontType="fas"
      fontIconName="envelope"
      onChange={(newValue: string) => {
        login.setAddress(newValue);
        login.emailAddress = newValue;
      }}
      value={login.emailAddress}
    />
  );
};
export default EmailAddressInputField;
