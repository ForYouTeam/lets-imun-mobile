export interface IScheduleList {
    id: string;
    title: string;
    date: string;
    month: string;
    description: string;
}

export type TScheduleContextType = {
    isLoading: boolean;
    scheduleList: IScheduleList[];

    setLoading: (loading: boolean) => void;
    setScheduleList: (payload: IScheduleList[]) => void;
    getScheduleFromMonth: (month: string) => IScheduleList[];
};
