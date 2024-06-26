import { ReactNode, createContext, useContext, useState } from "react";
import { IMemberStatus, TGlobalContextType } from "./types/GlobalType";

const GlobalContext = createContext<TGlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [memberStatus, setMemberStatus] = useState<IMemberStatus>({
    isVerify: false,
    status: 'unverified'
  })

  return (
    <GlobalContext.Provider
      value={{ isLoading, setLoading, isAuthenticated, setAuthenticated, memberStatus, setMemberStatus }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
