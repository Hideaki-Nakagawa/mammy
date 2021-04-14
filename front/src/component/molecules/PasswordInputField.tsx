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
      width: "15em",
    },
  })
);

/** パスワード入力フィールド コンポーネント */
const PasswordInputField = () => {
  //自力でパスワードの表示/非表示の処理を作ったけど、いらなかったのでコメント
  /** @summary state hook */
  //const [visible, showPassword] = useState(false);

  /** @summary change state click icon */
  // const handleClick = () => {
  //     showPassword(!visible);
  // };

  /** @summary style hook api */
  const classes: ClassNameMap = useStyles();

  return (
    <InputField
      addClass={classes}
      titleId="password_title"
      titleText="Password"
      id="password_input"
      unitText=""
      //inputType={visible ? 'text' : 'password'}
      inputType="password"
      maxLength={50}
      areaLabel="password"
      fontType="fas"
      fontIconName="key"
    />
    // <FontAwesomeIcon icon={['fas', visible ? 'eye' : 'eye-slash']} onClick={handleClick} />
  );
};
export default PasswordInputField;
