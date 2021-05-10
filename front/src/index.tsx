import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import { Diagnose, Home, Login, Setting, Splash } from "./component/page";
import { AuthProvider } from "./firebase/Auth";

library.add(fab, fas, far); //他のコンポーネントから簡単に呼び出せるようにするための登録処理

function App() {
  const theme: Theme = createMuiTheme({
    palette: {
      type: "dark",
      // type: "light",
    },
    mixins: {
      toolbar: {
        minHeight: "3rem",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/diagnose" component={Diagnose} />
            <Route path="/setting" component={Setting} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
