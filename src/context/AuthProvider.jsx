import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import moment from "moment/moment";
import axios from "axios";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const create = moment().format("LL");
  const time = moment().format("lll");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      setUser(result);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());
  const signOutUser = () => signOut(auth);

  useEffect(() => {
    if (user) {
      setInterval(() => {
        axios
          .patch(
            `https://chat-ripple-server.vercel.app/activity-status/${user?.uid}`,
            {
              status: true,
              activeFromNow: time,
            }
          )
          .then(({ data }) => {});
      }, 1000);
    }
  }, [time, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        create,
        time,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
