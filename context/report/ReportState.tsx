import { ReactNode, createContext, useContext, useState } from "react";
import { IVerifyPayload, TReportPannel } from "../types/ReportType";

const ReportContext = createContext<TReportPannel | undefined>(undefined);

export const ReportProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [verifyPayload, setVerifyPayload] = useState<IVerifyPayload>({
        address: "",
        email: "",
        gender: "",
        phone: "",
        name: "",
        nik: "",
        img_document: null,
    });
    const [loading, setLoading] = useState(false);

    return (
        <ReportContext.Provider
            value={{
                verifyPayload,
                setVerifyPayload,
                loading,
                setLoading,
            }}
        >
            {children}
        </ReportContext.Provider>
    );
};

export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error("useGlobal must be used within a HomeProvider");
    }
    return context;
};
