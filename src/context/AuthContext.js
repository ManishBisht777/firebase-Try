import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const InitialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(InitialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, InitialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
