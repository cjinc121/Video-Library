import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authInitialState, authReducer } from "../reducer/authReducer";
import {
  logInHandlerService,
  signUpHandlerService,
} from "../services/authCalls";
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  const logInHandler = async ({ email, password }) => {
    const res = await logInHandlerService(email, password);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.encodedToken);
      authDispatch({ type: "CREATE_SESSION", payload: res.data });

      navigate("/");
    }
  };

  const signUpHandler = async ({ first, last, email, password }) => {
    const data = await signUpHandlerService(first, last, email, password);
    // saving the encodedToken in the localStorage
    localStorage.setItem("token", data.encodedToken);
    authDispatch({ type: "START_SESSION", payload: data });
    navigate("/");
  };

  const signOutHandler = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "END_SESSION" });
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        logInHandler,
        signUpHandler,
        signOutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider, useAuth };
