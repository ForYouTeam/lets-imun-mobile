import { ReactNode, createContext, useContext, useState } from "react";
import { IScheduleList, TScheduleContextType } from "../types/ScheduleType";

const schedulesContext = createContext<TScheduleContextType | undefined>(
    undefined
);

export const SchedulesProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [scheduleList, setScheduleList] = useState<IScheduleList[]>([]);

    const getScheduleFromMonth = (month: string): IScheduleList[] => {
        return scheduleList.filter((schedule) => schedule.month === month);
    };
    return (
        <schedulesContext.Provider
            value={{
                isLoading,
                setLoading,
                scheduleList,
                setScheduleList,
                getScheduleFromMonth,
            }}
        >
            {children}
        </schedulesContext.Provider>
    );
};

export const useSchedules = () => {
    const context = useContext(schedulesContext);
    if (!context) {
        throw new Error("useGlobal must be used within a HomeProvider");
    }
    return context;
};
