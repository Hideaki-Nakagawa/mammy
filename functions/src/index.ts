import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions
  .region("us-central1")
  .https.onCall((data, context) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    return "Hello from Firebase!";
  });

/**
 * @summary firebaseにjson形式のデータを追加する関数
 * @param data.collection : firebaseに登録するときのコレクション名
 * @param data.mode : 動作モード
 * @arg "update" : 更新モード
 * @arg "new" ; 追加モード(default)
 * @param data.dataset : 登録するjson形式のデータ
 */
export const addDataset = functions
  .region("us-central1")
  .https.onCall(async (data, context) => {
    const collection: string = data.collection;
    const dataset: any = data.dataset;
    const mode: string = data.mode;
    switch (mode) {
      case "update":
        for (const key of Object.keys(dataset)) {
          const data = dataset[key];
          await db.collection(collection).doc(key).update(data);
        }
        break;

      case "new":
      default:
        let exist: boolean = false;
        for (const key of Object.keys(dataset)) {
          await db
            .collection(collection)
            .doc(key)
            .get()
            .then((doc) => {
              exist = exist || doc.exists;
              if (!exist) {
                const data = dataset[key];
                db.collection(collection).doc(key).set(data);
              }
            });
        }
        if (exist) return "Already exist dataset!";
        break;
    }
    return "Successfully added dataset!";
  });
