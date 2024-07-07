import { Colors } from "@/constants/Colors";
import { useGlobal } from "@/context/GlobalState";
import { useReport } from "@/context/report/ReportState";
import { getReport } from "@/services/report";
import { IReportResponse } from "@/services/report/type";
import { splitString } from "@/utils/GetSplitString";
import { isLoading } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const ReportPanelPart = () => {
    const { reportList, setReportList, loading, setLoading } = useReport();
    const { setAuthenticated } = useGlobal();

    const ImageGender = (gender: number) => {
        if (gender === 1) {
            return require("@/assets/images/icon/boy.png");
        }
        return require("@/assets/images/icon/girl.png");
    };

    const monthList = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const currentDate = new Date();
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
        currentDate.getMonth()
    );

    const getCurrentMonthName = (index: number): string => monthList[index];

    const nextMonth = async (): Promise<void> => {
        setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % monthList.length);
    };

    const prevMonth = async (): Promise<void> => {
        setCurrentMonthIndex(
            (prevIndex) => (prevIndex - 1 + monthList.length) % monthList.length
        );
    };

    const getReportList = async () => {
        setLoading(true);
        setReportList([])
        const { data, error, status } = await getReport(
            getCurrentMonthName(currentMonthIndex)
        );

        if (!data && status === 401) {
            setAuthenticated(false);
        }

        if (status !== 200 && error) {
            console.log(error);
        }

        if (status === 200 && data) {
            const result = data as {
                data: {
                    list: IReportResponse[];
                };
            };
            setReportList(result.data.list);
        }

        setTimeout(() => {
            setLoading(false);
        }, 100);
    };

    useEffect(() => {
        getReportList();
    }, [currentMonthIndex]);
    return (
        <View
            style={{
                flexDirection: "column",
                rowGap: 24,
                paddingBottom: 24,
            }}
        >
            <View
                style={{
                    paddingHorizontal: 24,
                    marginTop: 18,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View style={{ paddingHorizontal: 10 }}>
                    <View
                        style={{
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            paddingBottom: 15,
                            marginVertical: 24,
                            flexDirection: "column",
                            rowGap: 14,
                            borderRadius: 8,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 18,
                                fontFamily: "InterRegular",
                                color: Colors.Text,
                            }}
                        >
                            Laporan Anak Bulanan
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
                                disabled={loading}
                                onPress={() => {
                                    prevMonth();
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
                                    {getCurrentMonthName(currentMonthIndex)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={() => {
                                    nextMonth();
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
                    </View>
                </View>
            </View>

            {loading && (
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "InterRegular",
                        color: Colors.Text,
                    }}
                >
                    Mengambil Data...
                </Text>
            )}

            {!loading && reportList.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            paddingHorizontal: 24,
                            flexDirection: "column",
                            rowGap: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: "MontserratSemiBold",
                                transform: [{ scaleY: 1.1 }],
                                textTransform: "capitalize",
                            }}
                        >
                            {item.nama_anak}
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#E4E4E4",
                                height: "auto",
                                width: "100%",
                                flexDirection: "column",
                                borderRadius: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    columnGap: 4,
                                    borderBottomWidth: 0.8,
                                    borderBottomColor: "#E4E4E4",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.umur}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.bb}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.tb}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    columnGap: 4,
                                    alignItems: "center",
                                    paddingStart: 10,
                                }}
                            >
                                <View
                                    style={{
                                        width: 100,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 80,
                                        }}
                                        source={ImageGender(
                                            item.jenis_kelamin == "man" ? 1 : 2
                                        )}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        rowGap: 10,
                                        paddingHorizontal: 24,
                                        paddingVertical: 24,
                                        width: "70%",
                                    }}
                                >
                                    {splitString(item.check_up).map(
                                        (check, index2) => {
                                            return (
                                                <View
                                                    key={index2}
                                                    style={{
                                                        flexDirection: "row",
                                                        columnGap: 10,
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            fontFamily:
                                                                "InterRegular",
                                                            color: "#04364A",
                                                        }}
                                                    >
                                                        {check}
                                                    </Text>
                                                    <Image
                                                        style={{
                                                            width: 21,
                                                            height: 21,
                                                        }}
                                                        source={require("@/assets/images/icon/check.png")}
                                                    />
                                                </View>
                                            );
                                        }
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })}

            {reportList.length < 1 && !loading && (
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50,
                    }}
                >
                    <Image
                        style={{ height: 120, width: 120 }}
                        source={require("@/assets/images/empty.jpg")}
                    />
                    <Text
                        style={{
                            fontFamily: "InterRegular",
                            color: Colors.Text,
                        }}
                    >
                        Laporan kosong
                    </Text>
                </View>
            )}
        </View>
    );
};
export default ReportPanelPart;
