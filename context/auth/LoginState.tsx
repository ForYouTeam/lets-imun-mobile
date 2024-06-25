import { ReactNode, createContext, useContext, useState } from "react";
import { TLoginContext } from "../types/LoginType";

const RegisterContext = createContext<TLoginContext | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });

  const clearPayload = () => {
    setLoginPayload({
      username: "",
      password: "",
    });
  };

  const isComplete = () => {
    const result =
      loginPayload.username &&
      loginPayload.username.length >= 1 &&
      loginPayload.password &&
      loginPayload.password.length >= 1
        ? true
        : false;

    return result;
  };

  return (
    <RegisterContext.Provider
      value={{
        loading,
        setLoading,
        loginPayload,
        setLoginPayload,
        clearPayload,
        isComplete,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useGlobal must be used within a LoginProvider");
  }
  return context;
};
