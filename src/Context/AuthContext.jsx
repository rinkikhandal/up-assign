import { useContext, createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../GoogleSignIn/Config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("LoggedInUser")) || null
  );

  // Logout Function (Handles both Firebase and local auth)
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    }
    localStorage.removeItem("LoggedInUser");
    setUser(null);
    setLocalUser(null);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    localStorage.removeItem("LoggedInUser"); // Ensure local auth is cleared
  };

  // Local Sign-in (Example: From a login form)
  const localSignIn = (userData) => {
    localStorage.setItem("LoggedInUser", JSON.stringify(userData));
    setLocalUser(userData);
    setUser(null); // Ensure Firebase user is cleared
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.removeItem("LoggedInUser"); // Clear local auth
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, localUser, googleSignIn, localSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
