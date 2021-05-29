import React, { createContext, useCallback, useEffect, useState } from "react";
import { app } from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/** Auth Context */
const AuthContext = createContext(
  {} as {
    currentUser: firebase.User | null;
    signup: (email: string, password: string) => Promise<string>;
    signin: (email: string, password: string) => Promise<string>;
    signinWithGoogle: () => Promise<void>;
    signout: () => Promise<void>;
    updateProfile: (displayName: string, photoURL: string) => Promise<string>;
    resetPassword: (email: string) => Promise<string>;
    deleteUser: () => Promise<string>;
  }
);

/** Authコンポーネント */
const AuthProvider: React.FC = ({ children }) => {
  /** @summary state hook api */
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  /**
   * @summary メールアドレスでアカウントを作成
   * @param[in] email : メールアドレス
   * @param[in] password : パスワード
   * @retval success : 成功
   * @retval error : エラー
   */
  const signup = useCallback(
    async (email: string, password: string): Promise<string> => {
      try {
        await app.auth().createUserWithEmailAndPassword(email, password);
        return "success";
      } catch (error) {
        alert(error);
        return "error";
      }
    },
    []
  );

  /**
   * @summary メールアドレスでログイン
   * @param[in] email : メールアドレス
   * @param[in] password : パスワード
   * @retval success : 成功
   * @retval error : エラー
   */
  const signin = useCallback(
    async (email: string, password: string): Promise<string> => {
      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        await updateUserDB(app.auth().currentUser);
        return "success";
      } catch (error) {
        alert(error);
        return "error";
      }
    },
    []
  );

  /**
   * @summary Googleアカウントでログイン
   */
  const signinWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await app.auth().signInWithPopup(provider);
    } catch (error) {
      alert(error);
    }
  }, []);

  /**
   * @summary ログアウトする
   */
  const signout = useCallback(async () => {
    try {
      await app.auth().signOut();
    } catch (error) {
      alert(error);
    }
  }, []);

  /**
   * @summary ユーザプロファイルを更新する
   * @param[in] displayName : ユーザー名
   * @param[in] photoURL : ユーザー画像
   * @retval success : 成功
   * @retval error : エラー
   */
  const updateProfile = useCallback(
    async (displayName: string, photoURL: string): Promise<string> => {
      try {
        const user = app.auth().currentUser;
        await user?.updateProfile({ displayName, photoURL });
        await updateUserDB(user);
        return "success";
      } catch (error) {
        alert(error);
        return "error";
      }
    },
    []
  );

  /**
   * @summary パスワードを再設定するためのメールを送る
   * @param[in] email : メールアドレス
   * @retval success : 成功
   * @retval error : エラー
   */
  const resetPassword = useCallback(async (email: string): Promise<string> => {
    try {
      await app.auth().sendPasswordResetEmail(email);
      return "success";
    } catch (error) {
      alert(error);
      return "error";
    }
  }, []);

  /**
   * @summary ユーザーを削除する
   * @retval success : 成功
   * @retval error : エラー
   * @details ログイン中のユーザを削除する
   */
  const deleteUser = useCallback(async (): Promise<string> => {
    try {
      const user = app.auth().currentUser;
      await deleteUserDB(user);
      await user?.delete();
      return "success";
    } catch (error) {
      alert(error);
      return "error";
    }
  }, []);

  /**
   * @summary FireStoreにユーザー情報を保存
   */
  const updateUserDB = async (user: firebase.User | null) => {
    try {
      //ログインなし
      if (!user) {
        throw "updateUserDB - login user is null";
      }
      const userDoc = await app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (!userDoc.exists) {
        //新規作成
        await userDoc.ref.set({
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          icon: user.photoURL,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        //更新
        await userDoc.ref.update({
          email: user.email,
          name: user.displayName,
          icon: user.photoURL,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @summary FireStoreにユーザー情報を削除
   */
  const deleteUserDB = async (user: firebase.User | null) => {
    try {
      //ログインなし
      if (!user) {
        throw "deleteUserDB - login user is null";
      }
      await app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .delete()
        .then(() => {
          console.log("deleteUserDB - Document successfully deleted!");
        });
    } catch (error) {
      console.error("deleteUserDB - ", error);
    }
  };

  /**
   * @summary effect hook
   * @details componentWillMountと同じ
   * @attention 1回だけ
   */
  useEffect(() => {
    app.auth().onAuthStateChanged(function (user) {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        signin,
        signinWithGoogle,
        signout,
        updateProfile,
        resetPassword,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
