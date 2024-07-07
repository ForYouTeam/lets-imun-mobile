import { Colors } from "@/constants/Colors";
import { useGlobal } from "@/context/GlobalState";
import { useHome } from "@/context/home/HomeState";
import { useSchedules } from "@/context/home/Schedules";
import { IScheduleList } from "@/context/types/ScheduleType";
import { getSchedules } from "@/services/home/ScheduleService";
import { useEffect } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface IScheduleProps {
    data: IScheduleList[]
}

const ScheduleList: React.FC<IScheduleProps> = ({data}) => {
    return (
        <View style={{
            minHeight: 100
        }}>
            {data.map((item, index) => (
                <View
                    key={index}
                    style={{
                        marginBottom: 8,
                        borderWidth: 1,
                        borderColor: "#C4DFDF",
                        borderRadius: 8,
                        backgroundColor: "white",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            backgroundColor: 'white',
                            paddingVertical: 12,
                            paddingStart: 15,
                            paddingEnd: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                marginBottom: 0,
                                fontFamily: "InterBold",
                            }}
                        >
                            {item.title}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                columnGap: 8,
                                marginTop: item.description ? 4 : 0,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 11,
                                    marginBottom: 0,
                                    fontFamily: "InterRegular",
                                }}
                            >
                                {item.date}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    fontFamily: "InterRegular",
                                }}
                            >
                                {item.time}
                            </Text>
                        </View>
                        {item.description && (
                            <Text
                                style={{
                                    maxWidth: "100%",
                                }}
                            >
                                {item.description}
                            </Text>
                        )}
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: 5,
                            height: 200,
                            backgroundColor: "#64CCC5",
                        }}
                    />
                </View>
            ))}
        </View>
    );
};

const Calendar = () => {
    const { newsPayload } = useHome();
    const { isAuthenticated, setAuthenticated } = useGlobal();
    const {isLoading, setLoading, scheduleList, getScheduleFromMonth, setScheduleList} = useSchedules()

    const getScheduleList = async () => {
        const { data, error, status } = await getSchedules();

        if (status !== 200 && status === 401) {
            setAuthenticated(false);
        }
        if (status !== 200 && error) {
            console.log("error bagian jadwal: ", error);
        }

        if (status === 200 && data) {
            const result = data as {
                data: {
                    list: IScheduleList[]
                }
            }
            console.log(result.data.list);
            setScheduleList(result.data.list)
        }
    };

    useEffect(() => {
        getScheduleList()
    }, []);
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View
                style={{
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    paddingBottom: 15,
                    marginVertical: 24,
                    flexDirection: "column",
                    rowGap: 14,
                    backgroundColor: "#F7F7F7",
                    borderRadius: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: "#04364A",
                        fontFamily: "MontserratSemiBold",
                        transform: [{ scaleY: 1.1 }],
                    }}
                >
                    Jadwal Bulanan
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        columnGap: 20,
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            console.log("back");
                        }}
                        activeOpacity={0.8}
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 6,
                            borderRadius: 50,
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: Colors.primary,
                        }}
                    >
                        <Image
                            style={{
                                width: 24,
                                height: 24,
                            }}
                            source={require("@/assets/images/tabbar/arrow-left.png")}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 8,
                            paddingHorizontal: 32,
                            width: "70%",
                            borderRadius: 24,
                            backgroundColor: "#DAFFFB",
                            borderWidth: 1,
                            borderColor: Colors.primary,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#04364A",
                                fontFamily: "InterMedium",
                            }}
                        >
                            {newsPayload.month}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("back");
                        }}
                        activeOpacity={0.8}
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 6,
                            borderRadius: 50,
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: Colors.primary,
                        }}
                    >
                        <Image
                            style={{
                                width: 24,
                                height: 24,
                            }}
                            source={require("@/assets/images/tabbar/arrow-right.png")}
                        />
                    </TouchableOpacity>
                </View>
                <ScheduleList data={getScheduleFromMonth('Juli')} />
            </View>
        </View>
    );
};

export default Calendar;
