import { ReactNode, createContext, useContext, useState } from "react";
import { TRegisterContext } from "../types/RegisterType";

const RegisterContext = createContext<TRegisterContext | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [registerPayload, setRegisterPayload] = useState({
        username: "",
        password: "",
        password_confirmation: "",
    });

    return (
        <RegisterContext.Provider
            value={{
                loading,
                setLoading,
                registerPayload,
                setRegisterPayload,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error("useGlobal must be used within a RegisterProvider");
    }
    return context;
};
