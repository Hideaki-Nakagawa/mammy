import firebase from "firebase/app";
import "firebase/functions";

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const helloWorld = async () => {
  try {
    const sayHello = firebase.functions().httpsCallable("helloWorld");
    await sayHello().then((result) => {
      console.log(result);
    });
  } catch (error) {
    alert(error);
  }
};

/**
 * @summary firebaseにjson形式のデータを追加する関数
 * @param colName : firebaseに登録するときのコレクション名
 * @param mode : 動作モード
 * @arg "update" : 更新モード
 * @arg "new" ; 追加モード(default)
 * @param json : 登録するjson形式のデータ
 */
export const addDataset = async (colName: string, mode: string, json: any) => {
  try {
    const addDataset = firebase.functions().httpsCallable("addDataset");
    await addDataset({ collection: colName, mode: mode, dataset: json }).then(
      (result) => {
        console.log(result);
      }
    );
  } catch (error) {
    alert(error);
  }
};
