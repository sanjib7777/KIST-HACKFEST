"use client";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const [token, setToken] = useState(Cookies.get("token"));
  const [auth, setAuth] = useState(false);
  // const [userId, setUserId] = useState(null);

  useEffect(() => {
const token = Cookies.get('token');
console.log("Token", Cookies.get('token'));
    // console.log("Token", Cookies.get("token"));
    if (Cookies.get("token")) {
      console.log("Token found in cookies");
      // setToken(Cookies.get("token"));
      setAuth(true); 
    }
  }, []);

  const login = (user, auth) => {
   const token = Cookies.get("token");
    console.log("Token", token);
    setAuth(auth);
    localStorage.setItem("phishdeflect@username", user.username);
    localStorage.setItem("phishdeflect@userId", user.userId);
  };

  const logout = () => {
    // setUser("");
    // setUserId(null);
    setAuth(false);
    // setToken("");
    Cookies.remove("token");
    localStorage.removeItem("phishdeflect@username");
    localStorage.removeItem("phishdeflect@userId");
  };
  
  const context = { login, logout, auth, setAuth };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
