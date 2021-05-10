import React, { createContext, useCallback, useEffect, useState } from "react";
import { app } from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";

/** Auth Context */
const AuthContext = createContext({
  currentUser: null,
} as {
  currentUser: firebase.User | null;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
});

/** Authコンポーネント */
const AuthProvider: React.FC = ({ children }) => {
  /** @summary state hook api */
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  /**
   * @summary メールアドレスでアカウントを作成
   * @param[in] email : メールアドレス
   * @param[in] password : パスワード
   */
  const signup = useCallback(async (email: string, password: string) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  }, []);

  /**
   * @summary メールアドレスでログイン
   * @param[in] email : メールアドレス
   * @param[in] password : パスワード
   */
  const signin = useCallback(async (email: string, password: string) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      app.auth().onAuthStateChanged((user) => setCurrentUser(user));
    } catch (error) {
      alert(error);
    }
  }, []);

  /**
   * @summary Googleアカウントでログイン
   */
  const signinWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      app.auth().onAuthStateChanged((user) => setCurrentUser(user));
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
      setCurrentUser(null);
    } catch (error) {
      alert(error);
    }
  }, []);

  /**
   * @summary effect hook
   * @details componentWillMountと同じ
   * @attention 1回だけ
   */
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, signin, signinWithGoogle, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
