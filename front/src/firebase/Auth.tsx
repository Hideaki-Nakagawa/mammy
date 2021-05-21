import React, { createContext, useCallback, useEffect, useState } from "react";
import { app } from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";

/** Auth Context */
const AuthContext = createContext({
  // currentUser: null,
} as {
  currentUser: firebase.User | null;
  signup: (email: string, password: string) => Promise<string>;
  signin: (email: string, password: string) => Promise<string>;
  signinWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
  updateProfile: (displayName: string, photoURL: string) => Promise<string>;
  resetPassword: (email: string) => Promise<string>;
  deleteUser: () => Promise<string>;
});

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
        await app.auth().currentUser?.updateProfile({ displayName, photoURL });
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
      await app.auth().currentUser?.delete();
      return "success";
    } catch (error) {
      alert(error);
      return "error";
    }
  }, []);

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
