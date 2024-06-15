import { ReactNode, createContext, useContext, useState } from "react";
import { IHomeCarousel, INews, THomeCarousel } from "../types/HomeType";
import { getMonthName } from "@/utils/GetMonthLabel";

const HomeContext = createContext<THomeCarousel | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [homeCarousel, setHomeCarousel] = useState<IHomeCarousel[]>([]);
    const [homeNews, setHomeNews] = useState<INews[]>([]);
    const [newsPayload, setNewsPayload] = useState({ month: getMonthName() });

    const getNewsByMonth = (month: string) => {
        return homeNews.filter((item) => item.month.includes(month));
    };

    return (
        <HomeContext.Provider
            value={{
                homeCarousel,
                setHomeCarousel,
                homeNews,
                setHomeNews,
                getNewsByMonth,
                newsPayload,
                setNewsPayload
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};
