import React from "react";
import * as ReactDOM from "react-dom";
import {
  createMuiTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core"; //fontawesomeのコアファイル
import { fab } from "@fortawesome/free-brands-svg-icons"; //fontawesomeのbrandアイコンのインポート
import { fas } from "@fortawesome/free-solid-svg-icons"; //fontawesomeのsolidアイコンのインポート
import { far } from "@fortawesome/free-regular-svg-icons"; //fontawesomeのregularアイコンのインポート
import { Login } from "./component/page";

library.add(fab, fas, far); //他のコンポーネントから簡単に呼び出せるようにするための登録処理

function App() {
  const theme: Theme = createMuiTheme({
    palette: {
      type: "dark",
      //type: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  );
}
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
